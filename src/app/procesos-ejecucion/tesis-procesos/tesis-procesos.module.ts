// import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TesisProcesosRoutingModule } from './tesis-procesos-routing.module';
import { TesisProcesoService } from './shared/tesis-proceso.service';
import {
  FlowTesisProcesoPageComponent, FindTesisProcesoPageComponent,
  CreateTesisProcesoDialogComponent,
} from './containers';
import {
  TesisProcesoComponent, TesisProcesoListComponent,
  StepComponent, StepListComponent, FlowButtonsFooterComponent,
  FormAddTesistaComponent,
} from './components';

import { DgiFormulariosDinamicosDatosModule } from '@dgi/formularios-dinamicos-datos';
import { TesisProcesosComponent } from './tesis-procesos.component';
import { AngularModule } from '../../shared/angular/angular.module';
import { MaterialModule } from '../../shared/material/material.module';
import { UtilsModule } from '../../shared/components/utils.module';
import { EtapaService, EtapaReactiveService } from '../../etapas/shared/etapa.service';
import { TareaService, TareaReactiveService } from '../../tareas/shared/tarea.service';
import { CampoService } from '../../dynamic-form/shared/campo.service';
import {
  MatCardModule, MatFormFieldModule,
  MatDialogModule, MatInputModule, MatRadioModule,
  MatDatepickerModule, MatCheckboxModule, MatButtonModule,
  MatIconModule, MatMenuModule,
  MatTooltipModule, MatAutocompleteModule, MatStepperModule, MatSidenavModule, MatToolbarModule,
} from '@angular/material';
import { ProyectosService } from '../../proyectos/shared/proyectos.service';

const COMPONENTS: any[] = [
  TesisProcesosComponent,
  TesisProcesoListComponent,
  CreateTesisProcesoDialogComponent,
  FindTesisProcesoPageComponent,
  TesisProcesoComponent,
  FlowTesisProcesoPageComponent,
  FlowButtonsFooterComponent,
  StepComponent,
  StepListComponent,
  FormAddTesistaComponent
];

const MATERIAL_MODULES: any[] = [
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatStepperModule,
  MatSidenavModule,
  MatToolbarModule,

  // CdkTableModule,
  // MatTableModule,
];

@NgModule({
  imports: [
    AngularModule,
    // MaterialModule,
    ...MATERIAL_MODULES,
    UtilsModule,
    // DynamicFormModule,
    DgiFormulariosDinamicosDatosModule,

    TesisProcesosRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [

    EtapaService,
    EtapaReactiveService,
    TareaService,
    TareaReactiveService,
    TesisProcesoService,
    CampoService,
    ProyectosService,
  ],
  entryComponents: [
    CreateTesisProcesoDialogComponent,
    FormAddTesistaComponent,
  ],
})
export class TesisProcesosModule { }
