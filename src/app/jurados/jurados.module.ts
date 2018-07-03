import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuradosRoutingModule } from './jurados-routing.module';
import { JuradosComponent } from './jurados.component';
import { JuradosReactiveService, JuradosService } from './shared/jurados.service';
import { FindPageComponent, ProyectosPageComponent } from './containers';
import { FormEditComponent, FormNewComponent, ListComponent, SearchComponent } from './components';
import {
  MatCardModule, MatDialogModule,
  MatFormFieldModule, MatInputModule,
  MatRadioModule, MatDatepickerModule,
  MatCheckboxModule, MatButtonModule, MatIconModule, MatMenuModule
} from '@angular/material';
import { DgiButtonFabModule } from '@dgi/button-fab';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS: any[] = [
  JuradosComponent,

  FindPageComponent,
  ProyectosPageComponent,

  FormEditComponent,
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
  ],
  entryComponents: [
    FormNewComponent,
    FormEditComponent,
  ]
})
export class JuradosModule { }
