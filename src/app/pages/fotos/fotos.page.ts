import { Component, OnInit } from '@angular/core';
import { PhotoService, Photo } from '../../services/photo.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Conditional } from '@angular/compiler';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
})
export class FotosPage implements OnInit {
  // Declaracion de las variables que necesitaremos
  ///////public photos: Photo[] = []; 

  // Inyeccion de dependencias
  constructor( private photoService: PhotoService,
               private modalController: ModalController,
               private actionSheetController: ActionSheetController) 
  {}

  // Al cargar las fotos cargara las imagenes tomadas con anterioridad y asignara el arreglo de fotos del servicio a un arreglo local
  async ngOnInit() {
    await this.photoService.loadSaved();
    ////////////////////////this.photos = this.photoService.photos;
  }

  // Funcion que nos permite cerrar el modal y regresar a la pagina anterior
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Fotos',
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }

}