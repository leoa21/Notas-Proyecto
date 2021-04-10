import { Component, OnInit } from '@angular/core';
import { PhotoService, Photo } from '../../services/photo.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
})
export class FotosPage implements OnInit {

  public photos: Photo[] =[]

  constructor( private photoService: PhotoService,
               private modalController: ModalController) { }

  async ngOnInit() {
    await this.photoService.loadSaved();
    this.photos = this.photoService.photos;
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
