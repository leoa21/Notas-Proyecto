import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMateriaPageRoutingModule } from './agregar-materia-routing.module';

import { AgregarMateriaPage } from './agregar-materia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMateriaPageRoutingModule
  ],
  declarations: [AgregarMateriaPage]
})
export class AgregarMateriaPageModule {}
