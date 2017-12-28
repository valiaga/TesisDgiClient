import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material/material.module';
import { AngularModule } from '../shared/angular/angular.module';
import { ProcesoService } from '../procesos/shared/proceso.service';

import { ListProcesoPageComponent } from './containers/list-proceso-page.component';
import { ProcesoListComponent } from './components/proceso-list.component';
import { ProcesoComponent } from './components/proceso.component';
import { SeguimientosRoutingModule } from "./seguimientos-routing.module";
import { UserService } from '../auth/user/user.service';

@NgModule({
  imports: [
    MaterialModule,
    AngularModule,

    // HttpModule,
    SeguimientosRoutingModule
  ],
  declarations: [
    ListProcesoPageComponent,
    ProcesoListComponent,
    ProcesoComponent,
  ],
  providers: [
    ProcesoService,
    UserService
  ]
})
export class SeguimientosModule { }
