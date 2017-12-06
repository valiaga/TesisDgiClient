import { UserService } from '../auth/user/user.service';
import { HttpModule } from '@angular/http';
import { ProcesoService } from '../procesos/shared/proceso.service';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

// import { CommonModule } from '@angular/common';
import { SeguimientoComponent } from './seguimiento.component';
import { SeguimientoRoutingModule } from "./seguimiento-routing.module";
import { ProcesosComponent } from './procesos/procesos.component';

@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    SeguimientoRoutingModule
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
export class SeguimientoModule { }
