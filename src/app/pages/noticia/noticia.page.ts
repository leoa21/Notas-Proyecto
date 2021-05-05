import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoticiaService, Article } from '../../services/noticia.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {
  // Declaracion de las variables que necesitaremos
  noticias: Article[] = [];
  firstLaunch = false;

  // Inyeccion de dependencias
  constructor( private modalController: ModalController,
               private noticiasService: NoticiaService ) 
  {}

  // Al cargar la pagina obtendra las noticias del NewsAPI y las guardara en el arreglo localmente
  ngOnInit() {
    // Checa el valor de la variable bandera
    if (this.firstLaunch === false) {
      // Usa el metodo de noticiasService para cargar las noticias
      this.noticiasService.getNoticia().subscribe(resp =>{
        // Guarda las noticias a una arreglo local
        this.noticias.push(resp.articles[0],resp.articles[1],resp.articles[2],resp.articles[3],resp.articles[4]);
      });
      // Cambia el valor de la variable bandera ya que no queremos que haga la peticion al api cada vez que entre a la pagina.
      // Como ya guardamos las noticias del dia de hoy no es necesario volver a llamar la peticion.
      this.firstLaunch = true;
    }
  }

  // funcion para cerrar el modal
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
