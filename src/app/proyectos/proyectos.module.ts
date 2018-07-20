import { NgModule } from '@angular/core';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { FindProyectoPageComponent } from './containers/find-proyecto-page.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/index';

import { AngularModule } from '../shared/angular/angular.module';

@NgModule({
  imports: [
    SharedModule,

    AngularModule,
    ProyectosRoutingModule,

    ComponentsModule

  ],
  declarations: [
    FindProyectoPageComponent,
  ]
})
export class ProyectosModule { }
