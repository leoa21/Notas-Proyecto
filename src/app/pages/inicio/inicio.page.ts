import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarMateriaPage } from '../agregar-materia/agregar-materia.page';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor( private modalController: ModalController,
               private tareasService: TareasService) { }

  progreso: number = 0;
  porcentage: number = 0;

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
    this.tareasService.obtenerMaterias().push(resp.data);
    console.log(this.arregloMaterias);
  }

  borrarMateria( indice ){
    this.arregloMaterias.splice(indice,1);
  }  

  obtenerIndex( i ) {
    this.tareasService.indexMateria = i;
  }


  actualizarBarra ( ) {
    var terminadas: number = 0;
  
    for (var i=0 ; i < this.tareasService.tareas.length ; i++) {
      if(this.tareasService.tareas[i].colorTarea === 'success') {
        terminadas++;
      }
 
    }
    this.progreso = (terminadas/this.tareasService.tareas.length); 
    this.porcentage = Math.round(this.progreso * 100);
   }  

}
  


