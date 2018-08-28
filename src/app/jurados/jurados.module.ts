import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuradosRoutingModule } from './jurados-routing.module';
import { JuradosComponent } from './jurados.component';
import { JuradosReactiveService, JuradosService } from './shared/jurados.service';
import { FindPageComponent, ProyectosPageComponent } from './containers';
import {
  FormEditComponent, FormNewComponent, ListComponent,
  SearchComponent, FormVinculeComponent,
} from './components';
import {
  MatCardModule, MatDialogModule,
  MatFormFieldModule, MatInputModule,
  MatRadioModule, MatDatepickerModule,
  MatCheckboxModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, MatAutocompleteModule,
} from '@angular/material';
import { DgiButtonFabModule } from '@dgi/button-fab';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonasService } from '../personas/shared/personas.service';

const COMPONENTS: any[] = [
  JuradosComponent,

  FindPageComponent,
  ProyectosPageComponent,

  FormEditComponent,
  FormVinculeComponent,
  FormNewComponent,
  ListComponent,
  SearchComponent,
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
];

const DGI_MODULES: any[] = [
  DgiButtonFabModule,
];

@NgModule({
  imports: [
    CommonModule,
    JuradosRoutingModule,
    ReactiveFormsModule,

    ...MATERIAL_MODULES,
    ...DGI_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    JuradosService,
    JuradosReactiveService,
    PersonasService,
  ],
  entryComponents: [
    FormNewComponent,
    FormEditComponent,
    FormVinculeComponent,
  ],
})
export class JuradosModule { }
