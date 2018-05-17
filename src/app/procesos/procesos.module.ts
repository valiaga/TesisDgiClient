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
  MatCardModule, MatInputModule, MatGridListModule,
  MatSlideToggleModule, MatListModule, MatTabsModule,
  MatButtonModule, MatExpansionModule, MatDialogModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatSelectModule, MatStepperModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CovalentExpansionPanelModule, CovalentStepsModule } from '@covalent/core';
import { CommonModule } from '@angular/common';
import { DgiButtonFabModule } from '../shared/dgi/button-fab';
import { RolProcesoComponent } from './components/rol-proceso/rol-proceso.component';
import { EtapaNewComponent } from './components/etapa/etapa-new/etapa-new.component';
import { EtapaReactiveService, EtapaService } from '../etapas/shared/etapa.service';
import { RolProcesoService } from '../rol-proceso/shared/rol-proceso.service';
import { EtapaEditorComponent } from './components/etapa/etapa-editor/etapa-editor.component';
import { EtapaTareasComponent } from './components/tarea/etapa-tareas/etapa-tareas.component';
import { EtapaListaComponent } from './components/tarea/etapa-lista/etapa-lista.component';
import { TareaReactiveService, TareaService } from '../tareas/shared/tarea.service';
import { TareaEditorComponent } from './components/tarea/tarea-editor/tarea-editor.component';
import { TareaNewComponent } from './components/tarea/tarea-new/tarea-new.component';
import { ProcesosComponent } from './procesos.component';
import { RequisitoReactiveService, RequisitosService } from '../requisitos/shared/requisitos.service';
import { RequisitoNewComponent } from './components/requisito/requisito-new/requisito-new.component';
import { TareaFormsListComponent } from './components/tarea-forms/tarea-forms-list/tarea-forms-list.component';
import { FormularioService } from '../dynamic-form/shared/formulario.service';
import { FormToolsService } from '../shared/form-tools.service';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { FormNewComponent } from './components/tarea-forms/form-new/form-new.component';

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
  CommonModule,
];

const COVALENT_MODULES: any = [
  // CovalentExpansionPanelModule,
  CovalentStepsModule,
];

const DGI_MODULES: any = [
  DgiButtonFabModule,
];

const FORM_COMPONENTS: any = [
  FormNewComponent,
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


    DynamicFormModule,
  ],
  declarations: [
    NuevoComponent,
    EditorComponent,
    ProcesoListComponent,
    ProcesoComponent,
    ProcesoSearchComponent,
    FindProcesoPageComponent,
    RolProcesoComponent,
    EtapaNewComponent,
    EtapaEditorComponent,
    EtapaTareasComponent,
    EtapaListaComponent,
    TareaEditorComponent,
    TareaNewComponent,
    ProcesosComponent,

    TareaFormsListComponent,

    RequisitoNewComponent,
    ...FORM_COMPONENTS,
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

    FormToolsService,
  ],
  entryComponents: [
    RolProcesoComponent,
    EtapaNewComponent,
    TareaNewComponent,
    RequisitoNewComponent,
    FormNewComponent,
  ]
})
export class ProcesosModule { }
