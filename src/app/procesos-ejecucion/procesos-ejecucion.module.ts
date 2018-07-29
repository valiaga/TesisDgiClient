import { NgModule } from '@angular/core';

// import { MaterialModule } from '../shared/material/material.module';
// import { AngularModule } from '../shared/angular/angular.module';
import { ProcesosService } from '../procesos/shared/proceso.service';

import {
  ListProcesoPageComponent,
  FindTesisProcesoPageComponent, CreateTesisProcesoDialogComponent,
} from './containers';
import {
  ProcesoComponent, ProcesoListComponent,
  TesisProcesoListComponent, FormAddTesistaComponent,
} from './components';
import { ProcesosEjecucionRoutingModule } from './procesos-ejecucion-routing.module';
import { ProcesosEjecucionComponent } from './procesos-ejecucion.component';
import { DgiButtonFabModule } from '@dgi/button-fab';
import { TesisProcesoService } from '../tesis-procesos/shared';
import {
  MatCardModule, MatDialogModule,
  MatAutocompleteModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatButtonModule, MatInputModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProyectosService } from '../proyectos/shared/proyectos.service';
// import { UserService } from '../auth/user/user.service';

const MATERIAL_MODULES: any[] = [
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  // MatRadioModule,
  // MatDatepickerModule,
  // MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  // MatTooltipModule,
  MatAutocompleteModule,
  // MatStepperModule,
  // MatSidenavModule,
  // MatToolbarModule,

  // CdkTableModule,
  // MatTableModule,
];

const DGI_MODULES: any[] = [
  DgiButtonFabModule,
];


@NgModule({
  imports: [
    // MaterialModule,
    // AngularModule,
    ...MATERIAL_MODULES,
    CommonModule,
    ReactiveFormsModule,
    ProcesosEjecucionRoutingModule,

    ...DGI_MODULES,
  ],
  declarations: [
    ProcesosEjecucionComponent,
    ListProcesoPageComponent,
    ProcesoListComponent,
    ProcesoComponent,
    TesisProcesoListComponent,
    FindTesisProcesoPageComponent,
    CreateTesisProcesoDialogComponent,
    FormAddTesistaComponent,
  ],
  providers: [
    ProcesosService,
    TesisProcesoService,
    ProyectosService,
    // UserService
  ],
  entryComponents: [
    FormAddTesistaComponent,
    CreateTesisProcesoDialogComponent,
  ]
})
export class ProcesosEjecucionModule { }
