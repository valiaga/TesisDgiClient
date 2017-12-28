// import { SettingsService } from '../shared/settings.service';
import { UserService } from '../auth/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { AngularModule } from '../shared/angular/angular.module';
import { MaterialModule } from '../shared/material/material.module';
import { CovalentModule } from '../shared/covalent/covalent.module';
import { UtilsModule } from '../shared/components/utils.module';

import { NuevoComponent } from './nuevo/nuevo.component';
import { EditorComponent } from './editor/editor.component';

import { ProcesosRoutingModule } from "./procesos-routing.module";
import { ProcesoListComponent } from './components/proceso-list.component';
import { ProcesoComponent } from './components/proceso.component';
import { ProcesoSearchComponent } from './components/proceso-search.component';
import { FindProcesoPageComponent } from './containers/find-proceso-page.component';

import { ProcesoService } from "./shared/proceso.service";

@NgModule({
  imports: [
    AngularModule,
    MaterialModule,
    CovalentModule,
    HttpClientModule,
    UtilsModule,

    ProcesosRoutingModule
  ],
  declarations: [
    NuevoComponent,
    EditorComponent,
    ProcesoListComponent,
    ProcesoComponent,
    ProcesoSearchComponent,
    FindProcesoPageComponent
  ],
  providers: [
    ProcesoService,
    UserService,
    // SettingsService
  ]
})
export class ProcesosModule { }
