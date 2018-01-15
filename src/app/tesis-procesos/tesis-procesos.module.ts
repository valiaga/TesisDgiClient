import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TesisProcesoListComponent } from './components/tesis-proceso-list.component';
import { CreateTesisProcesoDialogComponent } from './containers/create-tesis-proceso-dialog.component';
import { AngularModule } from '../shared/angular/angular.module';
import { MaterialModule } from '../shared/material/material.module';
import { FindTesisProcesoPageComponent } from './containers/find-tesis-proceso-page.component';
import { TesisProcesosRoutingModule } from './tesis-procesos-routing.module';
import { TesisProcesoService } from './shared/tesis-proceso.service';
import { SharedModule } from '../shared/shared.module';
import { TesisProcesoComponent } from './components/tesis-proceso.component';
import { UtilsModule } from '../shared/components/utils.module';
import { FlowTesisProcesoPageComponent } from './containers/flow-tesis-proceso-page/flow-tesis-proceso-page.component';
import { FlowButtonsFooterComponent } from './components/flow-buttons-footer/flow-buttons-footer.component';
import { StepComponent } from './components/step.component';
import { StepListComponent } from './components/step-list.component';
import { EtapaService } from '../etapas/shared/etapa.service';
import { TareaService } from '../tareas/shared/tarea.service';


import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { FormularioService } from '../dynamic-form/shared/formulario.service';
import { CampoService } from '../dynamic-form/shared/campo.service';

@NgModule({
  imports: [
    AngularModule,
    MaterialModule,
    UtilsModule,
    DynamicFormModule,

    TesisProcesosRoutingModule,
  ],
  declarations: [
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
    TesisProcesoService,
    CampoService,
    EtapaService,
    FormularioService,
    TareaService,
    // ControlService,
  ],
  entryComponents: [
    CreateTesisProcesoDialogComponent
  ]
})
export class TesisProcesosModule { }
