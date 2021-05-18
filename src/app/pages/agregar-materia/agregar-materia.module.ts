import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMateriaPageRoutingModule } from './agregar-materia-routing.module';

import { AgregarMateriaPage } from './agregar-materia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgregarMateriaPageRoutingModule
  ],
  declarations: [AgregarMateriaPage]
})
export class AgregarMateriaPageModule {}
