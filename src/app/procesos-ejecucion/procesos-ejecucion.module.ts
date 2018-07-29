import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material/material.module';
import { AngularModule } from '../shared/angular/angular.module';
import { ProcesosService } from '../procesos/shared/proceso.service';

import { ListProcesoPageComponent } from './containers';
import { ProcesoComponent, ProcesoListComponent } from './components';
import { ProcesosEjecucionRoutingModule } from './procesos-ejecucion-routing.module';
import { ProcesosEjecucionComponent } from './procesos-ejecucion.component';
// import { UserService } from '../auth/user/user.service';

@NgModule({
  imports: [
    MaterialModule,
    AngularModule,

    ProcesosEjecucionRoutingModule
  ],
  declarations: [
    ProcesosEjecucionComponent,
    ListProcesoPageComponent,
    ProcesoListComponent,
    ProcesoComponent,
  ],
  providers: [
    ProcesosService,
    // UserService
  ]
})
export class ProcesosEjecucionModule { }
