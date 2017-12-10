import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { FindProyectoPageComponent } from './containers/find-proyecto-page.component';
import { ProyectoSearchComponent } from './components/proyecto-search.component';
import { ProyectoPreviewComponent } from './components/proyecto-preview.component';
import { ProyectoPreviewListComponent } from './components/proyecto-preview-list.component';
import { ProyectoAuthorsComponent } from './components/proyecto-authors.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ProyectosRoutingModule
  ],
  declarations: [
    FindProyectoPageComponent, 
    ProyectoSearchComponent, 
    ProyectoPreviewComponent, 
    ProyectoPreviewListComponent, 
    ProyectoAuthorsComponent
  ]
})
export class ProyectosModule { }
