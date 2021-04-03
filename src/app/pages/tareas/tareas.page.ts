import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarTareaPage } from '../agregar-tarea/agregar-tarea.page';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  constructor( private modalController: ModalController ) { }

  tareas: {
    nombreTarea: string, 
    colorTarea: string
  }[] = [];

  ngOnInit() {
    
  }

  
  async agregarTarea() {
    const modal = await this.modalController.create({
      component: AgregarTareaPage,
      componentProps: {
        nombreTarea: '',
        colorTarea: ''
      }
    });
    await modal.present();

    const resp = await modal.onWillDismiss();
    console.log(resp);
    this.tareas.push(resp.data);
    console.log(this.tareas);
  }

 borrarTarea(){
 }
    

  }

