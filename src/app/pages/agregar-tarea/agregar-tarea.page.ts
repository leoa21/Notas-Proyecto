import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.page.html',
  styleUrls: ['./agregar-tarea.page.scss'],
})
export class AgregarTareaPage implements OnInit {

  color: string = 'medium';
  nombre: string = '';
  
  @Input() nombreTarea: string;
  @Input() colorTarea: string;

  constructor( private modalController: ModalController ) { }

  ngOnInit() {
  }

  agregarTareaModal() {
    this.modalController.dismiss({
      nombreTarea: this.nombre,
      colorTarea: this.color
    });
  }

  cancelartarea() {
    this.modalController.dismiss();
  }

  colorSeleccionado( e ) {
    this.color = e.detail.value;
  }

  nombretarea( e ) {
    this.nombre = e.detail.value;
  }

}
