// import { SettingsService } from '../shared/settings.service';
import { UserService } from '../auth/user/user.service';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProcesosComponent } from "./procesos/procesos.component";
import { NuevoComponent } from './nuevo/nuevo.component';
import { ListaComponent } from './lista/lista.component';
import { EditorComponent } from './editor/editor.component';
// import { CommonModule } from '@angular/common';

import { ProcesosRoutingModule } from "./procesos-routing.module";
import { ProcesoService } from "./shared/proceso.service";
import { AngularModule } from '../shared/angular/angular.module';
import { MaterialModule } from '../shared/material/material.module';
import { CovalentModule } from '../shared/covalent/covalent.module';

@NgModule({
  imports: [
    AngularModule,
    MaterialModule,
    CovalentModule,
    HttpModule,

    // CommonModule
    ProcesosRoutingModule
  ],
  declarations: [
    ProcesosComponent,
    NuevoComponent,
    ListaComponent,
    EditorComponent
  ],
  providers: [
    ProcesoService,
    UserService,
    // SettingsService
  ]
})
export class ProcesosModule { }
