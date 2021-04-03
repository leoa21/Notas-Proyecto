import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.page.html',
  styleUrls: ['./agregar-materia.page.scss'],
})
export class AgregarMateriaPage implements OnInit {

  color: string = 'medium';
  nombre: string = '';
  
  @Input() nombreClase: string;
  @Input() colorClase: string;

  constructor( private modalController: ModalController ) { }

  ngOnInit() {
  }

  agregarMateriaModal() {
    this.modalController.dismiss({
      nombreClase: this.nombre,
      colorClase: this.color
    });
  }

  cancelarMateria() {
    this.modalController.dismiss();
  }

  colorSeleccionado( e ) {
    this.color = e.detail.value;
  }

  nombreMateria( e ) {
    this.nombre = e.detail.value;
  }

}
