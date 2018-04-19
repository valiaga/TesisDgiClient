import { NgModule } from '@angular/core';

import { EscuelasRoutingModule } from './escuelas-routing.module';
import { FindEscuelaPageComponent } from './containers/find-escuela-page.component';
import { EscuelaListComponent } from './components/escuela-list.component';
import { EscuelaSearchComponent } from './components/escuela-search.component';
import { AngularModule } from '../shared/angular/angular.module';
import { MaterialModule } from '../shared/material/material.module';
import { UtilsModule } from '../shared/components/utils.module';
import { EscuelaComponent } from './components/escuela.component';
import { EscuelaService } from './shared/escuela.service';
import { CreateEscuelaDialogComponent } from './containers/create-escuela-dialog/create-escuela-dialog.component';
import { FacultadService } from '../facultades/shared/facultad.service';
import { CovalentModule } from '../shared/covalent/covalent.module';

@NgModule({
  imports: [
    AngularModule,
    MaterialModule,
    UtilsModule,
    CovalentModule,

    EscuelasRoutingModule
  ],
  declarations: [
    FindEscuelaPageComponent,
    EscuelaListComponent,
    EscuelaSearchComponent,
    EscuelaComponent,
    CreateEscuelaDialogComponent,
  ],
  providers: [
    EscuelaService,
    FacultadService,
  ],
  entryComponents: [
    CreateEscuelaDialogComponent
  ]
})
export class EscuelasModule { }
