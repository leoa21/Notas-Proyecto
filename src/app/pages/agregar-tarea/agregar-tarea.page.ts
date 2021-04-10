import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Photo, PhotoService } from 'src/app/services/photo.service';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.page.html',
  styleUrls: ['./agregar-tarea.page.scss'],
})
export class AgregarTareaPage implements OnInit {

  public photos: Photo[] = [];
  
  nombre: string = ' ';
  fecha: string = ' ';
  detalle: string =' ';
  color: string = ' ';
  indiceDeMateria: number;
  tareas: object[];
  
  @Input() materiaID: number;
  @Input() nombreTarea: string;
  @Input() fechaTarea: string;
  @Input() detalleTarea: string;
  @Input() colorTarea: string;

  constructor( private modalController: ModalController, 
               private photoService: PhotoService, 
               private tareasService: TareasService ) {
  }

  ngOnInit() {
    this.indiceDeMateria = this.tareasService.indexMateria;
    this.tareas = this.tareasService.tareas;
  }

  agregarTareaModal() {
    this.modalController.dismiss({
      materiaID: this.indiceDeMateria,
      nombreTarea: this.nombre,
      fechaTarea: this.fecha,
      colorTarea: this.color,
      detalleTarea: this.detalle
    });
  }

  cancelartarea() {
    this.modalController.dismiss({
      materiaID: -1,
      nombreTarea: ' ',
      fechaTarea: ' ',
      colorTarea: ' ',
      detalleTarea: ' '
    });
  }

  obtenerDetalleTarea( e ) {
    this.detalle = e.detail.value;
  }

  obtenerNombreTarea( e ) {
    this.nombre = e.detail.value;
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  fechaSeleccionado( e ) {
    this.fecha = e.detail.value;
  }

  statusSeleccionado ( e ) {
    this.color = e.detail.value;
  }
  
}
