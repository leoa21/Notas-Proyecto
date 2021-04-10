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

  indiceDeTarea: number
  indiceDeMateria: number;
  arregloTareas: Array<object>;
  colorSeleccionado: string = 'medium';

  //public photos: Photo[] =[]

  progreso: number = 0;
  porcentage: number = 0;

  placeHolder: string;

  constructor( private tareasService: TareasService, 
               private photoService: PhotoService) {}

  async ngOnInit() {
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

    await this.photoService.loadSaved();
    //this.photos = this.photoService.photos;
  }

  statusSeleccionado( event ) {
    this.tareasService.tareas[this.indiceDeTarea].colorTarea = event.detail.value;
    this.colorSeleccionado = this.tareasService.tareas[this.indiceDeTarea].colorTarea;
  }

}
