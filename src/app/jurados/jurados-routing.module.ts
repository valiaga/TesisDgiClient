import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JuradosComponent } from './jurados.component';
import { FindPageComponent, ProyectosPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: JuradosComponent,
    children: [
      {
        path: '',
        component: FindPageComponent,
      },
      {
        path: ':juradoId/proyectos',
        component: ProyectosPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuradosRoutingModule { }
