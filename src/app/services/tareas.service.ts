import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TareasService{
  private _storage: Storage | null = null;

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

  constructor(private storage: Storage) {
    this.init(); 
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarMateria(materias, borrar) {
    if (!borrar){
      this.materias.push(materias);
    }
    this.storage.set('materias', this.materias);
  }

  async cargarMaterias() {
    const materias = await this.storage.get('materias');
    if (materias) {
      this.materias = materias;
    } 
    
  }

  guardarTarea(tareas, borrar) {
    if (!borrar){
      this.tareas.push(tareas);
    }
    this.storage.set('tareas', this.tareas);
  }

  async cargarTareas() {
    const tareas = await this.storage.get('tareas');
    if (tareas) {
      this.tareas = tareas;
    } 
  }


  indexMateria: number;
  indexTarea: number;


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
    var borrar = true;
    this.guardarTarea(this.tareas, borrar);
    var borrar = false;
  }
  

}
