import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoticiaService, Article } from '../../services/noticia.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {

  noticias: Article[] = [];
  firstLaunch = false;

  constructor( private modalController: ModalController,
               private noticiasService: NoticiaService ) { }

  ngOnInit() {
    if (this.firstLaunch === false) {
      this.noticiasService.getNoticia().subscribe(resp =>{
        this.noticias.push(resp.articles[0],resp.articles[1],resp.articles[2],);
      });
      this.firstLaunch = true;
    }
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
