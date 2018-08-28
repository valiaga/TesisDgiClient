/**
 * Modulos de enrutado de Angular 5
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './core/components/not-found-page.component';
import { AuthGuardService } from './auth/shared/auth-guard.service';
// import { LoginPageComponent } from './auth/containers/login-page.component';
// import { ShellComponent } from './core/shell/shell.component';
// import { AppComponent } from './app.component';


// Array con las rutas de la aplicación
const routes: Routes = [
  {
    path: 'tesis-procesos',
    loadChildren: 'app/tesis-procesos/tesis-procesos.module#TesisProcesosModule',
    canActivate: [
      AuthGuardService,
    ],
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule',
  },
  {
    path: '',
    loadChildren: 'app/core/core.module#CoreModule',
    canActivate: [
      AuthGuardService,
    ],
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',  // para casos not found
    redirectTo: '404',
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }), // configuración para un módulo raiz
  ],
  exports: [
    RouterModule, // se importará desde el módulo padre, el raiz
  ],
})
export class AppRoutingModule { }
