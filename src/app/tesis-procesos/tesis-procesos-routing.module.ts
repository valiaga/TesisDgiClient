import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindTesisProcesoPageComponent } from './containers/find-tesis-proceso-page.component';
import { FlowTesisProcesoPageComponent } from './containers/flow-tesis-proceso-page/flow-tesis-proceso-page.component';

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
    component: FindTesisProcesoPageComponent,
  },
  {
    path: ':id',
    component: FlowTesisProcesoPageComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesisProcesosRoutingModule { }
