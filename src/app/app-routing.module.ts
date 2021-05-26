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
  },
  {
    path: 'detalles-tarea',
    loadChildren: () => import('./pages/detalles-tarea/detalles-tarea.module').then( m => m.DetallesTareaPageModule)
  },
  {
    path: 'fotos',
    loadChildren: () => import('./pages/fotos/fotos.module').then( m => m.FotosPageModule)
  },
  {
    path: 'noticia',
    loadChildren: () => import('./pages/noticia/noticia.module').then( m => m.NoticiaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'song/:id',
    loadChildren: () => import('./pages/song/song.module').then( m => m.SongPageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
