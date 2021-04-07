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

}
