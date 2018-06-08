import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AngularModule } from '../shared/angular/angular.module';
import { MaterialModule } from '../shared/material/material.module';
import { TesisProcesosRoutingModule } from './tesis-procesos-routing.module';
import { TesisProcesoService } from './shared/tesis-proceso.service';
import { SharedModule } from '../shared/shared.module';
import { UtilsModule } from '../shared/components/utils.module';
import { EtapaService, EtapaReactiveService } from '../etapas/shared/etapa.service';
import { TareaService, TareaReactiveService } from '../tareas/shared/tarea.service';
import {
  FlowTesisProcesoPageComponent, FindTesisProcesoPageComponent,
  CreateTesisProcesoDialogComponent,
} from './containers';
import {
  TesisProcesoComponent, TesisProcesoListComponent,
  StepComponent, StepListComponent, FlowButtonsFooterComponent,
} from './components';


// import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { CampoService } from '../dynamic-form/shared/campo.service';
import { DgiFormulariosDinamicosDatosModule } from '@dgi/formularios-dinamicos-datos';
import { TesisProcesosComponent } from './tesis-procesos.component';

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
