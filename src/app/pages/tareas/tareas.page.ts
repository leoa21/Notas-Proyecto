import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AgregarTareaPage } from '../agregar-tarea/agregar-tarea.page';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  constructor( private modalController: ModalController,
               private tareasService: TareasService,
               private toastController: ToastController) { }

  indiceDeMateria: number;
  arregloMaterias = this.tareasService.obtenerMaterias();
  arregloTareas: Array<object>;

  progreso: number = 0;
  porcentage: number = 0;

  ngOnInit() {
    this.indiceDeMateria = this.tareasService.indexMateria;
    this.arregloTareas = this.tareasService.tareas;
    this.actualizarBarra();
  }

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

    if ( resp.data.colorTarea !== ' ' && resp.data.detalleTarea !== ' ' && resp.data.fechaTarea !== ' ' && resp.data.nombreTarea !== ' ' ) {
      this.tareasService.tareas.push(resp.data);
      this.arregloTareas = this.tareasService.tareas;
    } else {
      this.presentToast();
    }

    this.actualizarBarra();
  }

 borrarTarea( indice ){
  //this.tareas.splice(indice,1);
  this.tareasService.tareas.splice(indice,1);
  console.log(this.tareasService.tareas);
 }

 // BARRA DE PROGRESO
 actualizarBarra ( ) {
  var terminadas: number = 0;
  var totalEnMateriaID: number = 0;

  for (var i=0 ; i < this.tareasService.tareas.length ; i++) {
    if(this.tareasService.tareas[i].colorTarea === 'success' && this.tareasService.tareas[i].materiaID === this.indiceDeMateria) {
      terminadas++;
    }
    if(this.tareasService.tareas[i].materiaID === this.indiceDeMateria){
      totalEnMateriaID++;
    }
  }
  this.progreso = (terminadas/totalEnMateriaID); 
  this.porcentage = Math.round(this.progreso * 100);

  if (isNaN(this.porcentage)) {
    this.porcentage = this.porcentage || 0; 
  }
 }  

 obtenerIndexTarea( i ) {
   this.tareasService.indexTarea = i;
 }

 async presentToast() {
  const toast = await this.toastController.create({
    message: 'Campos incompletos',
    duration: 500
  });
  toast.present();
 }
}

