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


@NgModule({
  imports: [
    AngularModule,
    MaterialModule,

    TesisProcesosRoutingModule,
  ],
  declarations: [
    TesisProcesoListComponent,
    CreateTesisProcesoDialogComponent,
    FindTesisProcesoPageComponent
    ],
  providers: [
    TesisProcesoService
  ],
  entryComponents: [
    CreateTesisProcesoDialogComponent
  ]
})
export class TesisProcesosModule { }
