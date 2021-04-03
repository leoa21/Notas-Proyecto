import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    children: [
      {
        path:'',
        loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
      path: ":tareas",
      loadChildren: () => import('./pages/tareas/tareas.module').then(m => m.TareasPageModule)
      }
    ]
  },
  {
    path: 'agregar-materia',
    loadChildren: () => import('./pages/agregar-materia/agregar-materia.module').then( m => m.AgregarMateriaPageModule)
  },
  {
    path: 'agregar-tarea',
    loadChildren: () => import('./pages/agregar-tarea/agregar-tarea.module').then( m => m.AgregarTareaPageModule)
  },  {
    path: 'detalles-tarea',
    loadChildren: () => import('./pages/detalles-tarea/detalles-tarea.module').then( m => m.DetallesTareaPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
