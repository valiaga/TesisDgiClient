import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material/material.module';
import { AngularModule } from '../shared/angular/angular.module';
import { ProcesoService } from '../procesos/shared/proceso.service';

import { ListProcesoPageComponent } from './containers';
import { ProcesoComponent, ProcesoListComponent } from './components';
import { SeguimientosRoutingModule } from './seguimientos-routing.module';
import { SeguimientosComponent } from './seguimientos.component';
// import { UserService } from '../auth/user/user.service';

@NgModule({
  imports: [
    MaterialModule,
    AngularModule,

    // HttpModule,
    SeguimientosRoutingModule
  ],
  declarations: [
    SeguimientosComponent,
    ListProcesoPageComponent,
    ProcesoListComponent,
    ProcesoComponent,
  ],
  providers: [
    ProcesoService,
    // UserService
  ]
})
export class SeguimientosModule { }
