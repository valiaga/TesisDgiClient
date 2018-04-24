// import { SettingsService } from '../shared/settings.service';
// import { UserService } from '../auth/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { AngularModule } from '../shared/angular/angular.module';
import { MaterialModule } from '../shared/material/material.module';
import { CovalentModule } from '../shared/covalent/covalent.module';
import { UtilsModule } from '../shared/components/utils.module';

import { NuevoComponent } from './nuevo/nuevo.component';
import { EditorComponent } from './editor/editor.component';

import { ProcesosRoutingModule } from './procesos-routing.module';
import { ProcesoListComponent } from './components/proceso-list.component';
import { ProcesoComponent } from './components/proceso.component';
import { ProcesoSearchComponent } from './components/proceso-search.component';
import { FindProcesoPageComponent } from './containers/find-proceso-page.component';

import { ProcesoService } from './shared/proceso.service';
import {
  MatCardModule, MatInputModule,
  MatSlideToggleModule, MatListModule, MatTabsModule,
  MatButtonModule, MatExpansionModule, MatDialogModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatSelectModule, MatStepperModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CovalentExpansionPanelModule, CovalentStepsModule } from '@covalent/core';
import { CommonModule } from '@angular/common';
import { DgiButtonFabModule } from '../shared/dgi/button-fab';
import { RolProcesoComponent } from './components/rol-proceso/rol-proceso.component';
import { EtapaComponent } from './components/etapa/etapa.component';
import { EtapaReactiveService, EtapaService } from '../etapas/shared/etapa.service';
import { RolProcesoService } from '../rol-proceso/shared/rol-proceso.service';
import { EtapaEditorComponent } from './components/etapa-editor/etapa-editor.component';
import { EtapaTareasComponent } from './components/etapa-tareas/etapa-tareas.component';
import { EtapaListaComponent } from './components/etapa-lista/etapa-lista.component';
import { TareaReactiveService, TareaService } from '../tareas/shared/tarea.service';
import { TareaEditorComponent } from './components/tarea-editor/tarea-editor.component';

const MATERIAL_MODULES: any = [
  MatCardModule,
  MatInputModule,
  MatSlideToggleModule,
  MatListModule,
  MatTabsModule,
  MatButtonModule,
  MatExpansionModule,
  MatDialogModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatSelectModule,
  MatStepperModule,
];

const ANGULAR_MODULES: any = [
  ReactiveFormsModule,
  CommonModule,
];

const COVALENT_MODULES: any = [
  // CovalentExpansionPanelModule,
  CovalentStepsModule,
];

const DGI_MODULES: any = [
  DgiButtonFabModule,
];

@NgModule({
  imports: [
    // AngularModule,
    // MaterialModule,
    // HttpClientModule,
    // UtilsModule,
    ...MATERIAL_MODULES,
    ...ANGULAR_MODULES,
    ...COVALENT_MODULES,
    ...DGI_MODULES,
    ProcesosRoutingModule
  ],
  declarations: [
    NuevoComponent,
    EditorComponent,
    ProcesoListComponent,
    ProcesoComponent,
    ProcesoSearchComponent,
    FindProcesoPageComponent,
    RolProcesoComponent,
    EtapaComponent,
    EtapaEditorComponent,
    EtapaTareasComponent,
    EtapaListaComponent,
    TareaEditorComponent,
  ],
  providers: [
    ProcesoService,
    RolProcesoService,
    EtapaReactiveService,
    EtapaService,
    TareaReactiveService,
    TareaService,
  ],
  entryComponents: [
    RolProcesoComponent,
    EtapaComponent,
  ]
})
export class ProcesosModule { }
