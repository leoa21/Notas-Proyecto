import { Component, OnInit } from '@angular/core';
import { PhotoService, Photo } from '../../services/photo.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
})
export class FotosPage implements OnInit {
  // Declaracion de las variables que necesitaremos
  public photos: Photo[] = []; 

  // Inyeccion de dependencias
  constructor( private photoService: PhotoService,
               private modalController: ModalController) 
  {}

  // Al cargar las fotos cargara las imagenes tomadas con anterioridad y asignara el arreglo de fotos del servicio a un arreglo local
  async ngOnInit() {
    await this.photoService.loadSaved();
    this.photos = this.photoService.photos;
  }

  // Funcion que nos permite cerrar el modal y regresar a la pagina anterior
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}