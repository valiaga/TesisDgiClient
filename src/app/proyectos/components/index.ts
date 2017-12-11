import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { ProyectoAuthorsComponent } from './proyecto-authors.component';
import { ProyectoPreviewComponent } from './proyecto-preview.component';
import { ProyectoPreviewListComponent } from './proyecto-preview-list.component';
import { ProyectoSearchComponent } from './proyecto-search.component';

import { PipesModule } from '../../shared/pipes/index';
import { MaterialModule } from '../../shared/material/material.module';
import { ProyectoService } from '../shared/proyecto.service';

export const COMPONENTS = [
  ProyectoAuthorsComponent,
  ProyectoPreviewComponent,
  ProyectoPreviewListComponent,
  ProyectoSearchComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    MaterialModule,
    HttpModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    ProyectoService
  ]
})
export class ComponentsModule { }
