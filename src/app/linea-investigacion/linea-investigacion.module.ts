import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineaInvestigacionRoutingModule } from './linea-investigacion-routing.module';
import { FindLineaInvestigacionPageComponent } from './containers/find-linea-investigacion-page.component';
import { AngularModule } from '../shared/angular/angular.module';
import { MaterialModule } from '../shared/material/material.module';
import { LineaInvestigacionSearchComponent } from './components/linea-investigacion-search.component';
import { LineaInvestigacionListComponent } from './components/linea-investigacion-list.component';

@NgModule({
  imports: [
    CommonModule,
    AngularModule,
    MaterialModule,

    LineaInvestigacionRoutingModule
  ],
  declarations: [
    FindLineaInvestigacionPageComponent,
    
    LineaInvestigacionSearchComponent,
    LineaInvestigacionListComponent
  ]
})
export class LineaInvestigacionModule { }
