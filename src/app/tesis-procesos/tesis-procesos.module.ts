import { TesisProcesoService } from './shared/tesis-proceso.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { TesisProcesosComponent } from './tesis-procesos.component';
import { DialogNuevoTeProcesoComponent } from './dialog-nuevo-teproceso.component';

const routes: Routes = [
  {
    path: '',
    component: TesisProcesosComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    // CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TesisProcesosComponent,
    DialogNuevoTeProcesoComponent
    ],
  providers: [
    TesisProcesoService
  ],
  entryComponents: [DialogNuevoTeProcesoComponent]
})
export class TesisProcesosModule { }
