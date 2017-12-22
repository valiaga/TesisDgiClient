/**
 * Modulos de enrutado de Angular 5
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './core/components/not-found-page.component';

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
    path: 'seguimientos',
    loadChildren: './seguimientos/seguimientos.module#SeguimientosModule',
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
  },
  {
    path: 'linea-investigacions',
    loadChildren: './linea-investigacions/linea-investigacions.module#LineaInvestigacionsModule',
    data: {
      title: 'Linea-investigacions'
    }
  },
  {
    path: 'escuelas',
    loadChildren: './escuelas/escuelas.module#EscuelasModule',
    data: {
      title: 'Escuelas'
    }
  }

  // {
  //   path: '**', //para casos not found
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
  ,
  {
    path: '**',  //para casos not found
    component: NotFoundPageComponent 
  },
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
