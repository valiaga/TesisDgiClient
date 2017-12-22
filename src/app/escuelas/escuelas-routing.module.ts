import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindEscuelaPageComponent } from './containers/find-escuela-page.component';

const routes: Routes = [
  {
    path: '',
    component: FindEscuelaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscuelasRoutingModule { }
