import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AgregarMateriaPage } from '../agregar-materia/agregar-materia.page';
import { TareasService } from '../../services/tareas.service';
import { NoticiaPage } from '../noticia/noticia.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor( private modalController: ModalController,
               public tareasService: TareasService,
               private toastController: ToastController) {}

  progreso: number = 0;
  porcentage: number = 0;
  oscuro: boolean = false;
  arregloMaterias: { nombreClase: string; colorClase: string; }[] = [];

  ngOnInit() {
    this.actualizarBarra();
    this.tareasService.cargarMaterias();
    setTimeout(() => {
      this.arregloMaterias = this.tareasService.materias;
    }, 300);
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
      this.tareasService.guardarMateria(resp.data, false);
    } else {
      this.presentToast();
    }
  }

  async verNoticia() {
    const modal = await this.modalController.create({
      component: NoticiaPage
    });
    return await modal.present();
  }

  borrarMateria( indice ){
    var borrar = true;
    this.tareasService.borrarTareaService( indice );
    this.arregloMaterias.splice(indice,1);
    this.tareasService.guardarMateria(this.arregloMaterias, borrar);
    this.arregloMaterias = this.tareasService.obtenerMaterias();
    var borrar = false;
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
  


