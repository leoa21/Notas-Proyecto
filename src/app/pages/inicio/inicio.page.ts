import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarMateriaPage } from '../agregar-materia/agregar-materia.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor( private modalController: ModalController) { }

  materias: {
    nombreClase: string, 
    colorClase: string
  }[] = [];

  ngOnInit() {
    
  }

  
  async agregarMateria() {
    const modal = await this.modalController.create({
      component: AgregarMateriaPage,
      componentProps: {
        nombreClase: '',
        colorClase: ''
      }
    });
    await modal.present();

    const resp = await modal.onWillDismiss();
    this.materias.push(resp.data);
  }

  borrarMateria( indice ){
    this.materias.splice(indice,1);
  }  

  }
  


