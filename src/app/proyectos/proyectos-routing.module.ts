import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindProyectoPageComponent } from './containers/find-proyecto-page.component';

/**
 * Rutas que se manejan en este modulo
 * /proyectos/
 * /proyectos/nuevo
 * /proyectos/lista
 * /proyectos/42
 */
const routes: Routes = [
  {
    path: '',
    component: FindProyectoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectosRoutingModule { }
