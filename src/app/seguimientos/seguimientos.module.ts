import { UserService } from '../auth/user/user.service';
import { HttpModule } from '@angular/http';
import { ProcesoService } from '../procesos/shared/proceso.service';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

// import { CommonModule } from '@angular/common';
import { SeguimientoComponent } from './seguimiento.component';
import { SeguimientosRoutingModule } from "./seguimientos-routing.module";
import { ProcesosComponent } from './procesos/procesos.component';
import { MaterialModule } from '../shared/material/material.module';
import { AngularModule } from '../shared/angular/angular.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MaterialModule,
    AngularModule,

    HttpModule,
    SeguimientosRoutingModule
  ],
  declarations: [
    SeguimientoComponent,
    ProcesosComponent,
  ],
  providers: [
    ProcesoService,
    UserService
  ]
})
export class SeguimientosModule { }
