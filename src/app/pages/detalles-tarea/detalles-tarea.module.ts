import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesTareaPageRoutingModule } from './detalles-tarea-routing.module';

import { DetallesTareaPage } from './detalles-tarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesTareaPageRoutingModule
  ],
  declarations: [DetallesTareaPage]
})
export class DetallesTareaPageModule {}
