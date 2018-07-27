import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlowTesisProcesoPageComponent } from './containers';
import { TesisProcesosComponent } from './tesis-procesos.component';

/**
 * Rutas que se manejan en este modulo
 * /tesis-procesos/
 * /tesis-procesos/nuevo
 * /tesis-procesos/lista
 * /tesis-procesos/42
 */
const routes: Routes = [
  {
    path: '',
    component: TesisProcesosComponent,
    children: [
      {
        path: ':id',
        component: FlowTesisProcesoPageComponent,
      },
    ],
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesisProcesosRoutingModule { }
