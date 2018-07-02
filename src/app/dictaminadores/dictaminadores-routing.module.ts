import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictaminadoresComponent } from './dictaminadores.component';
import { ProyectosPageComponent, FindPageComponent } from './containers';

const routes: Routes = [
    {
        path: '',
        component: DictaminadoresComponent,
        children: [
            {
                path: '',
                component: FindPageComponent,
            },
            {
                path: ':dictaminadorId/proyectos',
                component: ProyectosPageComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DictaminadoresRoutingModule { }
