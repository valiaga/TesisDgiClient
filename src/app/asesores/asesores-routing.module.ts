import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsesoresComponent } from './asesores.component';
import { FindPageComponent, ProyectosPageComponent } from './containers';

const routes: Routes = [
    {
        path: '',
        component: AsesoresComponent,
        children: [
            {
                path: '',
                component: FindPageComponent,
            },
            {
                path: ':asesorId/proyectos',
                component: ProyectosPageComponent,
            },
            // {
            //     path: 'new',
            //     component: FindPageComponent,
            // },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AsesoresRoutingModule { }
