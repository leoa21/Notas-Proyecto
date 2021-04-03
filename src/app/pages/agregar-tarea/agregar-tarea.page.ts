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
  color: string = 'medium';
  nombre: string = '';
  detalle: string ="";
  
  @Input() nombreTarea: string;
  @Input() colorTarea: string;
  @Input() detalleTarea: string;

  constructor( private modalController: ModalController, private photoSvc: PhotoService ) {
   this.photos = photoSvc.getPhotos();
   }

  ngOnInit() {
  }

  agregarTareaModal() {
    this.modalController.dismiss({
      nombreTarea: this.nombre,
      colorTarea: this.color,
      detalleTarea: this.detalleTarea
    });
  }

  cancelartarea() {
    this.modalController.dismiss();
  }

  colorSeleccionado( e ) {
    this.color = e.detail.value;
  }

  nombretarea( e ) {
    this.nombre = e.detail.value;
  }

  public newPhoto(): void{
    this.photoSvc.addNewToGallery()
  }

  detalletarea( e ) {
    this.detalle = e.detail.value;
  }
}
