import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarTareaPage } from '../agregar-tarea/agregar-tarea.page';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  constructor( private modalController: ModalController) { }

  indice: number;
  progreso: number = 0;
  porcentage: number = 0;

  tareas: {
    nombreTarea: string, 
    detalleTarea: string,
    colorTarea: string
  }[] = [];

  ngOnInit() {
  }

  async agregarTarea() {
    const modal = await this.modalController.create({
      component: AgregarTareaPage,
      componentProps: {
        nombreTarea: '',
        detalleTarea: '',
        colorTarea: ''
      }
    });
    await modal.present();

    const resp = await modal.onWillDismiss();
    this.tareas.push(resp.data);
    this.actualizarBarra();
  }

 borrarTarea( indice ){
  this.tareas.splice(indice,1);
 }

 actualizarBarra ( ) {
  var terminadas: number = 0;

  for (var i=0 ; i < this.tareas.length ; i++) {
    if(this.tareas[i].colorTarea === 'success') {
      terminadas++;
    }
  }

  this.progreso = (terminadas/this.tareas.length); 
  this.porcentage = this.progreso * 100;
 }
    

}

