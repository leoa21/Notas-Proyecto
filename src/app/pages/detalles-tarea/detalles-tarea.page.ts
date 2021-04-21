import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, Input } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Photo, PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-detalles-tarea',
  templateUrl: './detalles-tarea.page.html',
  styleUrls: ['./detalles-tarea.page.scss'],
})
export class DetallesTareaPage implements OnInit {
  // Declaracion de las variables que necesitaremos
  indiceDeTarea: number
  indiceDeMateria: number;
  progreso: number = 0;
  porcentage: number = 0;
  colorSeleccionado: string = 'medium';
  placeHolder: string;
  arregloTareas: Array<object>;

  // Inyeccion de dependencias
  constructor( private tareasService: TareasService) 
  {}

  // Al cargar la pagina de obtienen las variables del indice de la tarea, materia, arreglo de tareas y el status de la tarea seleccionada.
  // Tambien carga las fotos tomadas con aterioridad.
  ngOnInit() {
    this.indiceDeTarea = this.tareasService.indexTarea;
    this.indiceDeMateria = this.tareasService.indexMateria;
    this.arregloTareas = this.tareasService.tareas;

    switch(this.tareasService.tareas[this.indiceDeTarea].colorTarea) {
      case 'danger': this.placeHolder = 'Pendiente';
                     break;
      case 'warning': this.placeHolder = 'En Proceso';
                     break;    
      case 'success': this.placeHolder = 'Terminado';
                     break;           
    }

    this.colorSeleccionado = this.tareasService.tareas[this.indiceDeTarea].colorTarea;
  }

  // Busca en el evento el status seleccionado y lo asigna a la variable repectiva al status.
  statusSeleccionado( event ) {
    this.tareasService.tareas[this.indiceDeTarea].colorTarea = event.detail.value;
    this.colorSeleccionado = this.tareasService.tareas[this.indiceDeTarea].colorTarea;

    // Al terminar guarda el nuevo arreglo con las modificaciones aplicadas al storage.
    this.tareasService.guardarTarea(this.tareasService.tareas,true);
  }

}