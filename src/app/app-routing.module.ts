/**
 * Modulos de enrutado de Angular 2
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Array con las rutas de la aplicación
const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
    data: {
      title: 'Home'
    }
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule',
    data: {
      title: 'About'
    }
  },
  {
    path: 'procesos',
    loadChildren: './procesos/procesos.module#ProcesosModule',
    data: {
      title: 'Procesos'
    }
  },
  {
    path: 'proyectos',
    loadChildren: './proyectos/proyectos.module#ProyectosModule',
    data: {
      title: 'Proyectos'
    }
  },
  {
    path: 'seguimiento',
    loadChildren: './seguimiento/seguimiento.module#SeguimientoModule',
    data: {
      title: 'Seguimientos'
    }
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    data: {
      title: 'Auth'
    }
  }//,
  // {
  //   path: '**', //para casos not found
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}) // configuración para un módulo raiz
  ],
  exports: [
    RouterModule // se importará desde el módulo padre, el raiz
  ]
})
export class AppRoutingModule { }
