import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor() { }

  indexMateria: number;
  indexTarea: number;

  materias: {
    nombreClase: string, 
    colorClase: string,
  }[] = [];

  tareas: {
    materiaID: number,
    nombreTarea: string, 
    fechaTarea: string,
    detalleTarea: string,
    colorTarea: string
  }[] = [];

  obtenerMaterias( ) {
    return this.materias;
  }

  obtenerTareas () {
    return this.tareas;
  }

  borrarTareaService( index:number ) {
    for (let i = 0; i < this.tareas.length; i++) {
      if (index === this.tareas[i].materiaID) {
        this.tareas.splice(i,1);
      }
      if ( this.tareas[i].materiaID > index ) {
        this.tareas[i].materiaID = this.tareas[i].materiaID - 1;
      }
    }

    for (let i = 0; i < this.tareas.length; i++) {
      if ( this.tareas[i].materiaID > index ) {
        this.tareas[i].materiaID = this.tareas[i].materiaID - 1;
      }
    }

  }

}
