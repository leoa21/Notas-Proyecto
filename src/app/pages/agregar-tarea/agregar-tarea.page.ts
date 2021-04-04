import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Photo } from 'src/app/models/photo.interface';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.page.html',
  styleUrls: ['./agregar-tarea.page.scss'],
})
export class AgregarTareaPage implements OnInit {

  public photos: Photo[] =[]
  
  nombre: string = '';
  detalle: string ='';
  color: string = '';
  
  @Input() nombreTarea: string;
  @Input() detalleTarea: string;
  @Input() colorTarea: string;

  constructor( private modalController: ModalController, private photoSvc: PhotoService ) {
   this.photos = photoSvc.getPhotos();
   }

  ngOnInit() {
  }

  agregarTareaModal() {
    this.modalController.dismiss({
      nombreTarea: this.nombre,
      colorTarea: this.color,
      detalleTarea: this.detalle
    });
  }

  cancelartarea() {
    this.modalController.dismiss();
  }

  obtenerDetalleTarea( e ) {
    this.detalle = e.detail.value;
  }

  obtenerNombreTarea( e ) {
    this.nombre = e.detail.value;
  }

  public newPhoto(): void{
    this.photoSvc.addNewToGallery()
  }

  fechaSeleccionado( event ) {
    console.log(event);
  }

  statusSeleccionado ( e ) {
    this.color = e.detail.value;
  }

  
}
