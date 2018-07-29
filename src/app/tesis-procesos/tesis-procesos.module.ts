import { NgModule } from '@angular/core';
import { TesisProcesosRoutingModule } from './tesis-procesos-routing.module';
import { TesisProcesoService } from './shared/tesis-proceso.service';
import { FlowTesisProcesoPageComponent } from './containers';
import { StepListComponent, FlowButtonsFooterComponent } from './components';
import { DgiFormulariosDinamicosDatosModule } from '@dgi/formularios-dinamicos-datos';
import { TesisProcesosComponent } from './tesis-procesos.component';
import {
  MatCardModule, MatFormFieldModule,
  MatDialogModule, MatInputModule, MatRadioModule,
  MatDatepickerModule, MatCheckboxModule, MatButtonModule,
  MatIconModule, MatMenuModule,
  MatTooltipModule, MatAutocompleteModule, MatStepperModule, MatSidenavModule, MatToolbarModule,
} from '@angular/material';

import { CommonModule } from '../../../node_modules/@angular/common';
import { TareaService } from '../tareas/shared/tarea.service';

const COMPONENTS: any[] = [
  TesisProcesosComponent,
  TesisProcesosComponent,
  FlowTesisProcesoPageComponent,
  FlowButtonsFooterComponent,
  StepListComponent,
];

const MATERIAL_MODULES: any[] = [
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatStepperModule,
  MatSidenavModule,
  MatToolbarModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    DgiFormulariosDinamicosDatosModule,
    TesisProcesosRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    TareaService,
    TesisProcesoService,
  ],
  entryComponents: [
  ],
})
export class TesisProcesosModule {
}
