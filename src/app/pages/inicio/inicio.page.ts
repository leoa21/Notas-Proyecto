import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AgregarMateriaPage } from '../agregar-materia/agregar-materia.page';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor( private modalController: ModalController,
               private tareasService: TareasService,
               private toastController: ToastController) { }

  progreso: number = 0;
  porcentage: number = 0;
  oscuro: boolean = false;

  arregloMaterias = this.tareasService.obtenerMaterias();

  ngOnInit() {
    this.actualizarBarra();
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

    if (resp.data.colorClase !== 'medium' && resp.data.nombreClase !== ' ') {
      this.tareasService.obtenerMaterias().push(resp.data);
    } else {
      this.presentToast();
    }

  }

  borrarMateria( indice ){
    this.tareasService.borrarTareaService( indice );
    this.arregloMaterias.splice(indice,1);
    this.arregloMaterias = this.tareasService.obtenerMaterias();
  }  

  obtenerIndex( i ) {
    this.tareasService.indexMateria = i;
  }


  actualizarBarra ( ) {
    let terminadas: number = 0;
  
    for (var i=0 ; i < this.tareasService.tareas.length ; i++) {
      if(this.tareasService.tareas[i].colorTarea === 'success') {
        terminadas++;
      }
 
    }
    this.progreso = (terminadas/this.tareasService.tareas.length); 
    this.porcentage = Math.round(this.progreso * 100);

    if (isNaN(this.porcentage)) {
      this.porcentage = this.porcentage || 0; 
    }

  }  

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Campos incompletos',
      duration: 500
    });
    toast.present();
   }

  toggleTheme() {
    this.oscuro = !this.oscuro;
    if(this.oscuro) {
      document.body.setAttribute('color-theme','dark');
    } else {
      document.body.setAttribute('color-theme','light');
    }
  }
}
  


