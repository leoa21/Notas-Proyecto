import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarNotaPageRoutingModule } from './agregar-nota-routing.module';

import { AgregarNotaPage } from './agregar-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarNotaPageRoutingModule
  ],
  declarations: [AgregarNotaPage]
})
export class AgregarNotaPageModule {}
