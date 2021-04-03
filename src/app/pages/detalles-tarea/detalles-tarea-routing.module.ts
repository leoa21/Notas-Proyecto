import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesTareaPage } from './detalles-tarea.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesTareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesTareaPageRoutingModule {}
