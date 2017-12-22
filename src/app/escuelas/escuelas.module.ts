import { NgModule } from '@angular/core';

import { EscuelasRoutingModule } from './escuelas-routing.module';
import { FindEscuelaPageComponent } from './containers/find-escuela-page.component';
import { EscuelaListComponent } from './components/escuela-list.component';
import { EscuelaSearchComponent } from './components/escuela-search.component';
import { AngularModule } from '../shared/angular/angular.module';
import { MaterialModule } from '../shared/material/material.module';
import { UtilsModule } from '../shared/components/utils.module';

@NgModule({
  imports: [
    AngularModule,
    MaterialModule,
    UtilsModule,

    EscuelasRoutingModule
  ],
  declarations: [
    FindEscuelaPageComponent, 
    EscuelaListComponent, 
    EscuelaSearchComponent
  ]
})
export class EscuelasModule { }
