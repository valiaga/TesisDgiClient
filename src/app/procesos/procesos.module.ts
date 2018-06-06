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
import { FindProcesoPageComponent } from './containers/find-proceso-page.component';

import { ProcesoService } from './shared/proceso.service';
import {
  MatCardModule, MatInputModule, MatGridListModule,
  MatSlideToggleModule, MatListModule, MatTabsModule,
  MatButtonModule, MatExpansionModule, MatDialogModule, MatCheckboxModule,
  MatMenuModule, MatIconModule, MatSelectModule, MatStepperModule,
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CovalentExpansionPanelModule, CovalentStepsModule } from '@covalent/core';
import { CommonModule } from '@angular/common';
import { DgiButtonFabModule } from '../shared/dgi/button-fab';
import { EtapaReactiveService, EtapaService } from '../etapas/shared/etapa.service';
import { RolProcesoService } from '../rol-proceso/shared/rol-proceso.service';
import { TareaReactiveService, TareaService } from '../tareas/shared/tarea.service';
import { ProcesosComponent } from './procesos.component';
import { RequisitoReactiveService, RequisitosService } from '../requisitos/shared/requisitos.service';
import { FormToolsService } from '../shared/form-tools.service';
// import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

import { FormularioNewComponent, FormulariosListComponent, FormularioEditComponent } from './components/formularios';
import { EtapaEditorComponent, EtapaNewComponent } from './components/etapas';
import {
  ProcesoComponent, ProcesoListComponent,
  ProcesoSearchComponent,
} from './components/procesos';
import { RequisitoNewComponent } from './components/requisitos';
import { RolProcesoComponent } from './components/rol-proceso/rol-proceso.component';
import {
  TareaEditorComponent,
  TareaNewComponent, TareasListComponent, EtapaListaComponent,
} from './components/tareas';
import { DgiFormulariosDinamicosModule } from '@dgi/formularios-dinamicos';
import { FormularioService } from '../formularios/shared/formulario.service';
import { CamposNewComponent } from './components/campos';
import { CamposService } from '../campos/shared/campos.service';

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
  MatGridListModule,
];

const ANGULAR_MODULES: any = [
  ReactiveFormsModule,
  FormsModule,
  CommonModule,
];

const COVALENT_MODULES: any = [
  // CovalentExpansionPanelModule,
  CovalentStepsModule,
];

const DGI_MODULES: any = [
  DgiButtonFabModule,
];

const ETAPAS_COMPONENTS: any = [
  EtapaEditorComponent,
  EtapaNewComponent,
];

const FORMULARIOS_COMPONENTS: any = [
  FormularioNewComponent,
  FormulariosListComponent,
  FormularioEditComponent,
];

const ROL_PROCESO_COMPONENTS: any = [
  RolProcesoComponent,
];

const REQUISITOS_COMPONENTS: any = [
  RequisitoNewComponent,
];

const TAREAS_COMPONENTS: any = [
  EtapaListaComponent,
  TareaEditorComponent,
  TareaNewComponent,
  TareasListComponent
];

const PROCESOS_COMPONENTS: any = [
  ProcesoComponent,
];

const CAMPOS_COMPONENTS: any = [
  CamposNewComponent,
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
    ProcesosRoutingModule,


    // DynamicFormModule,
    DgiFormulariosDinamicosModule,
  ],
  declarations: [
    NuevoComponent,
    EditorComponent,
    ProcesoListComponent,
    ProcesoComponent,
    ProcesoSearchComponent,
    FindProcesoPageComponent,
    ProcesosComponent,
    RequisitoNewComponent,

    ...ETAPAS_COMPONENTS,
    ...FORMULARIOS_COMPONENTS,
    ...ROL_PROCESO_COMPONENTS,
    ...REQUISITOS_COMPONENTS,
    ...TAREAS_COMPONENTS,
    ...CAMPOS_COMPONENTS,
  ],
  providers: [
    ProcesoService,
    RolProcesoService,
    EtapaReactiveService,
    EtapaService,
    TareaReactiveService,
    TareaService,
    FormularioService,

    RequisitoReactiveService,
    RequisitosService,
    CamposService,

    FormToolsService,
  ],
  entryComponents: [
    RolProcesoComponent,
    EtapaNewComponent,
    TareaNewComponent,
    RequisitoNewComponent,
    FormularioNewComponent,
    FormularioEditComponent,
    CamposNewComponent,
  ],
})
export class ProcesosModule { }
