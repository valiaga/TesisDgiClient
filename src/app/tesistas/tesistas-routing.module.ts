import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TesistasComponent } from './tesistas.component';
import { FindPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: TesistasComponent,
    children: [
      {
        path: '',
        component: FindPageComponent,
      },
      // {
      // path: ':tesistaId/proyectos',
      // component: ProyectosPageComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TesistasRoutingModule { }
