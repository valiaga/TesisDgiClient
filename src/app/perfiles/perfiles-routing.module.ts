import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilesComponent } from './perfiles.component';
import { FindPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: PerfilesComponent,
    children: [
        {
            path: '',
            component: FindPageComponent,
        },
        // {
            // path: ':asesorId/proyectos',
            // component: ProyectosPageComponent,
        // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilesRoutingModule { }
