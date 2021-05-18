import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Photo, PhotoService } from 'src/app/services/photo.service';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.page.html',
  styleUrls: ['./agregar-tarea.page.scss'],
})
export class AgregarTareaPage implements OnInit {
  // Declaracion de las variables que necesitaremos
  nombre: string = ' ';
  fecha: string = ' ';
  detalle: string =' ';
  color: string = ' ';
  indiceDeMateria: number;
  tareas: object[];
  colorSeleccionado: string = 'medium';

  isDisabled: boolean;

  //Variable para el formulario
  datosForm: FormGroup;
  
  // Variables que se agregaron gracias al modal de la pagina padre
  @Input() materiaID: number;
  @Input() nombreTarea: string;
  @Input() fechaTarea: string;
  @Input() detalleTarea: string;
  @Input() colorTarea: string;

  // Inyeccion de dependencias
  constructor( private modalController: ModalController, 
               private photoService: PhotoService, 
               private tareasService: TareasService,
               private formBuilder: FormBuilder,
               private toastController: ToastController ) {
    this.datosForm = this.formBuilder.group({
      // Aqui se checan que los caracteres introducidos sean validos para el formulario
      nombreDeTarea: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9 ]{1,25}$")
      ])),
      detalleDeTarea: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9 ]{1,100}$")
      ]))
    })
  }

  // Obtiene el indice de la materia ademas de las tareas y las guarda en variables al momento de cargar la pagina
  ngOnInit() {
    this.indiceDeMateria = this.tareasService.indexMateria;
    this.tareas = this.tareasService.tareas;
    this.isDisabled = true;
  }

  // Regresa los valores para el modal de la pagina padre
  agregarTareaModal() {
    this.modalController.dismiss({
      materiaID: this.indiceDeMateria,
      nombreTarea: this.nombre,
      fechaTarea: this.fecha,
      colorTarea: this.color,
      detalleTarea: this.detalle
    });
  }

  // Envia valores nulos a la pagina padre donde se haran las respectivas validaciones
  cancelartarea() {
    this.modalController.dismiss({
      materiaID: -1,
      nombreTarea: ' ',
      fechaTarea: ' ',
      colorTarea: ' ',
      detalleTarea: ' '
    });
  }

  // Busca en el evento el detalle escrito y lo asigna a la variable que se enviara al modal de la pagina padre
  obtenerDetalleTarea( e ) {
    this.detalle = e.detail.value;
  }

  // Busca en el evento el nombre escrito y lo asigna a la variable que se enviara al modal de la pagina padre
  obtenerNombreTarea( e ) {
    this.nombre = e.detail.value;
  }

  // Llama el metodo del serividio de fotos para tomar una nueva imagen de la tarea 
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  // Busca en el evento la fecha seleccionada y lo asigna a la variable que se enviara al modal de la pagina padre
  fechaSeleccionado( e ) {
    this.fecha = e.detail.value;
  }

  // Busca en el evento el status seleccionado y lo asigna a la variable que se enviara al modal de la pagina padre
  statusSeleccionado ( e ) {
    this.color = e.detail.value;
    this.colorSeleccionado = e.detail.value;
  }

  // Se checa el status del formulario para habilitar o deshabilitar el boton de aceptar
  validar(){
    if(this.datosForm.value.detalleDeTarea != '' && this.datosForm.value.nombreDeTarea != ''){
      if(this.datosForm.status == 'VALID'){
        this.isDisabled = false;
      } else {
        if(this.datosForm.status == 'INVALID'){
          this.isDisabled = true;
          this.presentToast();
        }
      }
    }
  }

  //Funcion para presentar un toast en caso de que los datos introducidos por el usuario no sean validos
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No se aceptan simbolos.',
      position: 'top',
      duration: 1300
    });
    toast.present();
  }
  
}