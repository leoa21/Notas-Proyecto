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
  // Declaracion de las variables que necesitaremos
  nombre: string = ' ';
  fecha: string = ' ';
  detalle: string =' ';
  color: string = ' ';
  indiceDeMateria: number;
  tareas: object[];
  colorSeleccionado: string = 'medium';
  
  // Variables que se agregaron gracias al modal de la pagina padre
  @Input() materiaID: number;
  @Input() nombreTarea: string;
  @Input() fechaTarea: string;
  @Input() detalleTarea: string;
  @Input() colorTarea: string;

  // Inyeccion de dependencias
  constructor( private modalController: ModalController, 
               private photoService: PhotoService, 
               private tareasService: TareasService ) {
  }

  // Obtiene el indice de la materia ademas de las tareas y las guarda en variables al momento de cargar la pagina
  ngOnInit() {
    this.indiceDeMateria = this.tareasService.indexMateria;
    this.tareas = this.tareasService.tareas;
  }

  // Regresa los valores para el modal de la pagina padre
  agregarTareaModal() {
    this.modalController.dismiss({
      materiaID: this.indiceDeMateria,
      nombreTarea: this.nombre,
      fechaTarea: this.fecha,
      colorTarea: this.color,
      detalleTarea: this.detalle
    });
  }

  // Envia valores nulos a la pagina padre donde se haran las respectivas validaciones
  cancelartarea() {
    this.modalController.dismiss({
      materiaID: -1,
      nombreTarea: ' ',
      fechaTarea: ' ',
      colorTarea: ' ',
      detalleTarea: ' '
    });
  }

  // Busca en el evento el detalle escrito y lo asigna a la variable que se enviara al modal de la pagina padre
  obtenerDetalleTarea( e ) {
    this.detalle = e.detail.value;
  }

  // Busca en el evento el nombre escrito y lo asigna a la variable que se enviara al modal de la pagina padre
  obtenerNombreTarea( e ) {
    this.nombre = e.detail.value;
  }

  // Llama el metodo del serividio de fotos para tomar una nueva imagen de la tarea 
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  // Busca en el evento la fecha seleccionada y lo asigna a la variable que se enviara al modal de la pagina padre
  fechaSeleccionado( e ) {
    this.fecha = e.detail.value;
  }

  // Busca en el evento el status seleccionado y lo asigna a la variable que se enviara al modal de la pagina padre
  statusSeleccionado ( e ) {
    this.color = e.detail.value;
    this.colorSeleccionado = e.detail.value;
  }
  
}