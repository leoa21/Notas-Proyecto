import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
//import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.page.html',
  styleUrls: ['./agregar-materia.page.scss'],
})
export class AgregarMateriaPage implements OnInit {
  // Declaracion de las variables que necesitaremos
  color: string = 'medium';
  nombre: string = ' ';

  isDisabled: boolean;

  //Variable para el formulario
  datosForm: FormGroup;
  
  // Variables que se agregaron gracias al modal de la pagina padre
  @Input() nombreClase: string;
  @Input() colorClase: string;

  // Inyeccion de dependencias
  constructor( private modalController: ModalController, private formBuilder: FormBuilder, private toastController: ToastController) {
    // Aqui se checan que los caracteres introducidos sean validos para el formulario
    this.datosForm = this.formBuilder.group({
      nombreDeClase: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9 ]{1,25}$")
      ])),
    })
  }

  ngOnInit() {
    this.isDisabled = true;
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

  // Se checa el status del formulario para habilitar o deshabilitar el boton de aceptar
  validar(){
    if(this.datosForm.status == 'VALID'){
      this.isDisabled = false;
    } else {
      if(this.datosForm.status == 'INVALID'){
        this.isDisabled = true;
        this.presentToast();
      }
    }
  }

  //Funcion para presentar un toast en caso de que los datos introducidos por el usuario no sean validos
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No se aceptan simbolos o mas de 25 caracteres.',
      position: 'top',
      duration: 1300
    });
    toast.present();
  }
}