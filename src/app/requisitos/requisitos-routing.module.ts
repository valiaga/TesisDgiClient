import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisitosComponent } from './requisitos.components';


const routes: Routes = [
    { path: 'path', component: RequisitosComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RequisitosRoutingModule { }

export const routedComponents = [RequisitosComponent];
