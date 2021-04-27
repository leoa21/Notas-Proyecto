import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AgregarTareaPage } from '../agregar-tarea/agregar-tarea.page';
import { TareasService } from '../../services/tareas.service';
import { FotosPage } from '../fotos/fotos.page';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
q// Declaracion de las variables que necesitaremos
  indiceDeMateria: number;
  progreso: number = 0;
  porcentage: number = 0;
  nombreClase: string = '';
  arregloMaterias = this.tareasService.obtenerMaterias();
  arregloTareas: { materiaID: number, nombreTarea: string,  fechaTarea: string, detalleTarea: string, colorTarea: string }[] = [];

  // Inyeccion de dependencias
  constructor( private modalController: ModalController,
               private tareasService: TareasService,
               private toastController: ToastController) 
  {}

  // Al cargar la pagina se cargaran las tareas, se obtendra le indice de la materia en la que nos encontramos, se creara un arreglo locar y
  // se actualizara la barra de progreso. 
  ngOnInit() {
    this.tareasService.cargarTareas();
    this.indiceDeMateria = this.tareasService.indexMateria;
    this.actualizarBarra();
    setTimeout(() => {
      this.arregloTareas = this.tareasService.tareas;
    }, 100);
    this.nombreClase = this.arregloMaterias[this.indiceDeMateria].nombreClase.toUpperCase();
  }

  // Se llama a un modal donde recibira las variables indicadas. 
  async agregarTarea() {
    const modal = await this.modalController.create({
      component: AgregarTareaPage,
      componentProps: {
        materiaID: 0,
        nombreTarea: '',
        fehaTarea: '',
        detalleTarea: '',
        colorTarea: ''
      }
    });
    await modal.present();

    const resp = await modal.onWillDismiss();

    // Validaciones para asegurarse que los campos al agregar una tarea esten completos
    if ( resp.data.colorTarea !== ' ' && resp.data.detalleTarea !== ' ' && resp.data.fechaTarea !== ' ' && resp.data.nombreTarea !== ' ' ) {
      this.tareasService.guardarTarea(resp.data, false);
    } else {
      // Si no cumple con las validaciones lanzara una pequeño mensaje para avisar al usuario
      this.presentToast();
    }

    // Llama la funcion encargada de actualizar la barra de progeso
    this.actualizarBarra();
  }

  // Presenta un modal donde se veran las fotos tomadas
  async verPhotos() {
    const modal = await this.modalController.create({
      component: FotosPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  // Fucion para borrar la tarea y se envia en indice de la tarea seleccionada
  borrarTarea( indice ){
    // Variable bandera para una metodo
    var borrar = true;
    // Se modifica el arreglo de tareas de tareasService para borrar la tarea indicada
    this.tareasService.tareas.splice(indice,1);
    // Se guarda el nuevo arreglo de atareas a la memoria
    this.tareasService.guardarTarea(this.arregloTareas, borrar);
    // Se guarrda el arreglo de tareas a un arreglo local
    this.arregloTareas = this.tareasService.obtenerTareas();
    var borrar = false;
  }

  // Metodo para actualizar la barra de progreso
  actualizarBarra ( ) {
    // Variable que contara las tareas termiandas
    let terminadas: number = 0;
    // Vable que contara el total de materias en una materia en especifico
    let totalEnMateriaID: number = 0;

    // Se hace un ciclo for para recorrer el arreglo de tareas
    for (var i=0 ; i < this.tareasService.tareas.length ; i++) {
      // Se checa si una tarea esta terminada y si la tarea que se checho esta en la materia
      if(this.tareasService.tareas[i].colorTarea === 'success' && this.tareasService.tareas[i].materiaID === this.indiceDeMateria) {
        // Se incrementa el numero de tareas terminadas
        terminadas++;
      }
      // Se checa si la tarea esta en la ma teria en las que nos encontramos
      if(this.tareasService.tareas[i].materiaID === this.indiceDeMateria){
        // Se incrementa el total de tareas en una materia
        totalEnMateriaID++;
      }
    }

    // Aqui se tomara la fraccion de las tareas terminadas/total de tareas
    this.progreso = (terminadas/totalEnMateriaID); 
    // Se convierte la fraccion a un numero representativo de un porcentage
    this.porcentage = Math.round(this.progreso * 100);

    // Si no hay tareas entonces se le asigna por defecto a la variable porcentage un 0
    if (isNaN(this.porcentage)) {
      this.porcentage = this.porcentage || 0; 
    }
  }  

  // Funcion apra obtener el indice de la tarea
  obtenerIndexTarea( i ) {
    this.tareasService.indexTarea = i;
  }

  // Esta funcion presentara un toast 
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Campos incompletos',
      duration: 500
    });
    toast.present();
  }
}

