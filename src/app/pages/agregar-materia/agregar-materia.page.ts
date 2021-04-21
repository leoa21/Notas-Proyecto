import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.page.html',
  styleUrls: ['./agregar-materia.page.scss'],
})
export class AgregarMateriaPage implements OnInit {
  // Declaracion de las variables que necesitaremos
  color: string = 'medium';
  nombre: string = ' ';
  
  // Variables que se agregaron gracias al modal de la pagina padre
  @Input() nombreClase: string;
  @Input() colorClase: string;

  // Inyeccion de dependencias
  constructor( private modalController: ModalController ) { }

  ngOnInit() {
  }

  // Regresa los valores para el modal de la pagina padre
  agregarMateriaModal() {
    this.modalController.dismiss({
      nombreClase: this.nombre,
      colorClase: this.color
    });
  }

  // Envia valores nulos a la pagina padre donde se haran las respectivas validaciones
  cancelarMateria() {
    this.modalController.dismiss({
      nombreClase: ' ',
      colorClase: ' '
    });
  }

  // Busca en el evento el valor seleccionado y lo asigna a la variable que se enviara al modal de la pagina padre
  colorSeleccionado( e ) {
    if ( e.detail.value !== 'medium') {
      this.color = e.detail.value;
    }
  }

  // Busca en el evento el valor seleccionado y lo asigna a la variable que se enviara al modal de la pagina padre
  nombreMateria( e ) {
    this.nombre = e.detail.value;
  }

}