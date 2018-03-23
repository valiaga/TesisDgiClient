/**
 * Modulos de enrutado de Angular 5
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './core/components/not-found-page.component';
// import { LoginPageComponent } from './auth/containers/login-page.component';
// import { ShellComponent } from './core/shell/shell.component';
// import { AppComponent } from './app.component';


// Array con las rutas de la aplicación
const routes: Routes = [
  {
    path: 'tesis-procesos',
    // path: 'tesis-etapas',
    loadChildren: './tesis-procesos/tesis-procesos.module#TesisProcesosModule',
    canActivate: [

    ]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    loadChildren: './core/core.module#CoreModule',
    canActivate: [

    ]
  },
  {
    path: '**',  // para casos not found
    component: NotFoundPageComponent
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }) // configuración para un módulo raiz
  ],
  exports: [
    RouterModule // se importará desde el módulo padre, el raiz
  ]
})
export class AppRoutingModule { }
