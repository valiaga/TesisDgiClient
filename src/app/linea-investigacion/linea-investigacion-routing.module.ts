import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindLineaInvestigacionPageComponent } from './containers/find-linea-investigacion-page.component';

/**
 * Rutas que se manejan en este modulo
 * /linea-investigacion/
 * /linea-investigacion/nuevo
 * /linea-investigacion/lista
 * /linea-investigacion/42
 */
const routes: Routes = [
  {
    path: '',
    component: FindLineaInvestigacionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineaInvestigacionRoutingModule { }
