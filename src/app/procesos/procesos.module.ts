import { NgModule } from '@angular/core';
import { NuevoComponent } from './nuevo/nuevo.component';
import { EditorComponent } from './editor/editor.component';
import { ProcesosRoutingModule } from './procesos-routing.module';
import { FindProcesoPageComponent } from './containers/find-proceso-page.component';
import {
  MatCardModule, MatInputModule, MatGridListModule,
  MatSlideToggleModule, MatListModule, MatTabsModule,
  MatButtonModule, MatExpansionModule, MatDialogModule, MatCheckboxModule,
  MatMenuModule, MatIconModule, MatSelectModule, MatStepperModule, MatRadioModule,
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CovalentStepsModule } from '@covalent/core';
import { CommonModule } from '@angular/common';
import { DgiButtonFabModule } from '../shared/dgi/button-fab';
import { EtapaReactiveService, EtapaService } from '../etapas/shared/etapa.service';
import { RolProcesoService, RolProcesoReactiveService } from '../rol-proceso/shared/rol-proceso.service';
import { TareaReactiveService, TareaService } from '../tareas/shared/tarea.service';
import { ProcesosComponent } from './procesos.component';
import { RequisitoReactiveService, RequisitosService } from '../requisitos/shared/requisitos.service';
import { FormToolsService } from '../shared/form-tools.service';

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
import { CamposNewComponent, CamposEditComponent } from './components/campos';
import { CamposService } from '../campos/shared/campos.service';
import { ValidadorNewComponent, ValidadorEditComponent } from './components/validadores';
import { GeneradorDocumentosNewComponent, GeneradorDocumentosEditComponent } from './components/generador-documentos';

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
  MatRadioModule,
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
  TareasListComponent,
];

const PROCESOS_COMPONENTS: any = [
  ProcesoComponent,
];

const CAMPOS_COMPONENTS: any = [
  CamposNewComponent,
  CamposEditComponent,
];

const VALIDADORES_COMPONENTS: any[] = [
  ValidadorNewComponent,
  ValidadorEditComponent,
];

const GENERADOR_DOCUMENTO_COMPONENTS: any[] = [
  GeneradorDocumentosNewComponent,
  GeneradorDocumentosEditComponent,
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
    ...GENERADOR_DOCUMENTO_COMPONENTS,
    ...VALIDADORES_COMPONENTS,

    ...PROCESOS_COMPONENTS,
  ],
  providers: [
    RolProcesoService,
    RolProcesoReactiveService,
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
    CamposEditComponent,

    GeneradorDocumentosNewComponent,
    GeneradorDocumentosEditComponent,

    ValidadorNewComponent,
    ValidadorEditComponent,
  ],
})
export class ProcesosModule { }
