import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AgregarMateriaPage } from '../agregar-materia/agregar-materia.page';
import { TareasService } from '../../services/tareas.service';
import { NoticiaPage } from '../noticia/noticia.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  // Declaracion de las variables que necesitaremos
  progreso: number = 0;
  porcentage: number = 0;
  oscuro: boolean = false;
  arregloMaterias: { nombreClase: string; colorClase: string; }[] = [];

  // Inyeccion de dependencias
  constructor( private modalController: ModalController,
               public tareasService: TareasService,
               private toastController: ToastController,
               private alertCtrl: AlertController) 
  {}

  // Al cargar la pagina se actualizara la barra de progreso y se cargara todas las materias que esten en la memoria
  ngOnInit() {
    this.tareasService.cargarMaterias();
    this.actualizarBarra();
    // Se agrego un pequeño setTimeout() ya que si no se agrega puede tener problemas al cargar las materias
    setTimeout(() => {
      this.arregloMaterias = this.tareasService.materias;
    }, 500);
  }

  // Se llama a un modal donde recibira las variables de nombrClase y colorClase 
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

    // Validaciones para asegurarse que los campos al agregar una materia esten completos
    if (resp.data.colorClase !== 'medium' && resp.data.nombreClase !== ' ') {
      // Se guarda la materia a la memoria en usando un metodo de tareasService
      this.tareasService.guardarMateria(resp.data, false);
    } else {
      // Si no cumple con las validaciones lanzara una pequeño mensaje para avisar al usuario
      this.presentToast();
    }
  }

  // Presenta un modal donde se veran las noticias del dia
  async verNoticia() {
    const modal = await this.modalController.create({
      component: NoticiaPage
    });
    return await modal.present();
  }

  // Este metodo recibe como parametro el indice de la materia para borrara del arreglo
  async borrarMateria( indice ){
    //Se crea una alerta para confirmar si se desea eliminar una materia.
    const alertElement = await this.alertCtrl.create({
      header: '¿Esta seguro de eliminar esta materia?',
      message: '¡Cuidado! Esto eliminara la materia definitivamente',
      buttons: [
        {
          //Boton de alerta para cancelar la eliminacion de la materia
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          //Boton de alerta para confirmar la eliminacion de la materia
          text: 'Eliminar',
          handler: () => {
            // Variable bandera para una metodo
            var borrar = true;
            // Se modifica el arreglo de meterias para ajustar el arreglo a los nuevos cambios
            this.arregloMaterias.splice(indice,1);
            // Se guarda el nuevo arreglo de materias a la memoria
            this.tareasService.guardarMateria(this.arregloMaterias, borrar);
            // Carga el nuevo arreglo y lo asigna al arreglo de materias local
            this.arregloMaterias = this.tareasService.obtenerMaterias();
            var borrar = false;
          }
        }
      ]
    });
    await alertElement.present();
  }
  

  // Obtiene el indice de la materia seleccionada 
  obtenerIndex( i ) {
    this.tareasService.indexMateria = i;
  }

  // Metodo para actualizar la barra de progreso
  actualizarBarra() {
    // Variable que contara todas las tareas terminadas 
    let terminadas: number = 0;
  
    //Ciclo que checara, para cada tarea, si esta terminada o no
    for (var i=0 ; i < this.tareasService.tareas.length ; i++) {
      if(this.tareasService.tareas[i].colorTarea === 'success') {
        // Si estan terminadas aumentara la variable que las esta contando
        terminadas++;
      }
 
    }
    // Aqui se tomara la fraccion de las tareas terminadas/total de tareas
    this.progreso = (terminadas/this.tareasService.tareas.length); 
    // Se convierte la fraccion a un numero representativo de un porcentage
    this.porcentage = Math.round(this.progreso * 100);

    // Si no hay tareas entonces se le asigna por defecto a la variable porcentage un 0
    if (isNaN(this.porcentage)) {
      this.porcentage = this.porcentage || 0; 
    }

    // Metodo que carga las tareas
    this.tareasService.cargarTareas();
  }  

  // Esta funcion presenta un toast
  async presentToast() {
    const toast = await this.toastController.create({
      // Se mostrara el mensaje indicando al usuario que no cumplio los requisitos al agregar la meteria
      message: 'Campos incompletos',
      duration: 500
    });
    toast.present();
  }

  // Funcion que invertira la variable responsable de cambiar el tema de la aplicacion
  toggleTheme() {
    this.oscuro = !this.oscuro;
    if(this.oscuro) {
      document.body.setAttribute('color-theme','dark');
    } else {
      document.body.setAttribute('color-theme','light');
    }
  }
  
}