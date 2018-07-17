import { RouterModule, Routes } from '@angular/router';
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
} from './components';

import { DgiFormulariosDinamicosDatosModule } from '@dgi/formularios-dinamicos-datos';
import { TesisProcesosComponent } from './tesis-procesos.component';
import { AngularModule } from '../../shared/angular/angular.module';
import { MaterialModule } from '../../shared/material/material.module';
import { UtilsModule } from '../../shared/components/utils.module';
import { EtapaService, EtapaReactiveService } from '../../etapas/shared/etapa.service';
import { TareaService, TareaReactiveService } from '../../tareas/shared/tarea.service';
import { CampoService } from '../../dynamic-form/shared/campo.service';

@NgModule({
  imports: [
    AngularModule,
    MaterialModule,
    UtilsModule,
    // DynamicFormModule,
    DgiFormulariosDinamicosDatosModule,

    TesisProcesosRoutingModule,
  ],
  declarations: [
    TesisProcesosComponent,
    TesisProcesoListComponent,
    CreateTesisProcesoDialogComponent,
    FindTesisProcesoPageComponent,
    TesisProcesoComponent,
    FlowTesisProcesoPageComponent,
    FlowButtonsFooterComponent,
    StepComponent,
    StepListComponent
  ],
  providers: [

    EtapaService,
    EtapaReactiveService,
    TareaService,
    TareaReactiveService,
    TesisProcesoService,
    CampoService,
  ],
  entryComponents: [
    CreateTesisProcesoDialogComponent
  ]
})
export class TesisProcesosModule { }
