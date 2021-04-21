import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TareasService{
  private _storage: Storage | null = null;

  // Declaracion de los arreglos de objetos que usaremos para las materias y fotos
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

  // Declaracion de variables que necesitaremos
  indexMateria: number;
  indexTarea: number;

  // Inyeccion de dependencias
  constructor( private storage: Storage ) {
    this.init(); 
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Funcion que se encarga de guardar el arreglo de materias a la memoria
  guardarMateria(materias, borrar) {
    if (!borrar){
      this.materias.push(materias);
    }
    this.storage.set('materias', this.materias);
  }

  // Funcion que se encarga de cargar el arreglo de materias de la memoria
  async cargarMaterias() {
    const materias = await this.storage.get('materias');
    if (materias) {
      this.materias = materias;
    } 
  }

  // Funcion que se encarga de guardar el arreglo de tareas a la memoria
  guardarTarea(tareas, borrar) {
    if (!borrar){
      this.tareas.push(tareas);
    }
    this.storage.set('tareas', this.tareas);
  }

  // Funcion que se encarga de cargar el arreglo de tareas de la memoria
  async cargarTareas() {
    const tareas = await this.storage.get('tareas');
    if (tareas) {
      this.tareas = tareas;
    } 
  }

  // Funcion para obtener el arreglo de materias fuera del servicio
  obtenerMaterias( ) {
    return this.materias;
  }

  //Funcion para obtener el arreglo ode tareas fuera del servicio
  obtenerTareas () {
    return this.tareas;
  }

  // Funcion que se encarga de borrar las tareas y recibe como parametro el indice de la materia
  borrarTareaService( index:number ) {
    // Checa todo el arreglo de tareas 
    for (let i = 0; i < this.tareas.length; i++) {
      // Si el indice de materia de una tarea es igual al indice de materia que se recibio como paremetro, se borra.
      if (index === this.tareas[i].materiaID) {
        this.tareas.splice(i,1);
      }
      // Si el indice de materia que se borro es menor al que se recibio de parametro, entonces se reduce en 1 el indice de materia de 
      // cada tarea para mantener el orden/datos correctos (es dificil de explicar)
      if ( this.tareas[i].materiaID > index ) {
        this.tareas[i].materiaID = this.tareas[i].materiaID - 1;
      }
    }

    for (let i = 0; i < this.tareas.length; i++) {
      if ( this.tareas[i].materiaID > index ) {
        this.tareas[i].materiaID = this.tareas[i].materiaID - 1;
      }
    }

    // Una vez que se hicieron las modifiaciones, se llama la funcion de guardarTarea para guardar las nuevas modificaciones
    // en memoria
    var borrar = true;
    this.guardarTarea(this.tareas, borrar);
    var borrar = false;
  }
  
}
