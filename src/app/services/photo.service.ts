import { Injectable } from '@angular/core';
import {Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource, Filesystem} from '@capacitor/core';
import { Platform } from '@ionic/angular';

const {Camera, FileSystem, Storage} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // Declaracion de variables que necesitaremos
  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";
  private platform: Platform;
  
  // Inyeccion de dependencias
  constructor( platform: Platform ) {
    this.platform = platform;
  }

  /********** Instrucciones indicadas por la documentacion de IONIC para la creacion de este servicio **********/
  public async addNewToGallery(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });
  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    const base64Data = await this.readAsBase64(cameraPhoto);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
  
    if (this.platform.is('hybrid')) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });

      return file.data;
    }
    else {
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async loadSaved() {
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];

    if (!this.platform.is('hybrid')) {
      for (let photo of this.photos) {
        const readFile = await Filesystem.readFile({
            path: photo.filepath,
            directory: FilesystemDirectory.Data
        });
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }
  /********** Instrucciones indicadas por la documentacion de IONIC para la creacion de este servicio **********/

}

//Interfaz para el arreglo de fotos
export interface Photo{
  filepath: string;
  webviewPath: string;
}
