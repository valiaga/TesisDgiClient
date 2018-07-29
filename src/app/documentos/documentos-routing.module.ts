import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentosComponent } from './documentos.component';
import { FindPageComponent } from './containers';

const routes: Routes = [
    {
        path: '',
        component: DocumentosComponent,
        children: [
            {
                path: '',
                component: FindPageComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DocumentosRoutingModule { }
