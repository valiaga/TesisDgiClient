import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { FindProyectoPageComponent } from './containers/find-proyecto-page.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/index';

@NgModule({
  imports: [
    SharedModule,
    ProyectosRoutingModule,

    ComponentsModule
  ],
  declarations: [
    FindProyectoPageComponent, 
  ]
})
export class ProyectosModule { }
