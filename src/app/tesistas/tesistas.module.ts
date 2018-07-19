import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TesistasRoutingModule } from './tesistas-routing.module';
import { TesistasComponent } from './tesistas.component';
import { TesistasService } from './shared/tesistas.service';
import {
  MatCardModule, MatFormFieldModule,
  MatDialogModule, MatInputModule, MatRadioModule,
  MatDatepickerModule, MatCheckboxModule, MatIconModule,
  MatButtonModule, MatMenuModule, MatTooltipModule,
  MatAutocompleteModule, MatTableModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { DgiButtonFabModule } from '@dgi/button-fab';
import { FindPageComponent } from './containers';
import {
  SearchComponent, ListComponent, FormNewComponent,
  FormEditComponent, FormVinculeComponent,
} from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonasService } from '../personas/shared/personas.service';

const COMPONENTS: any[] = [
  TesistasComponent,

  FindPageComponent,
  FormNewComponent,
  FormEditComponent,
  FormVinculeComponent,
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

  CdkTableModule,
  MatTableModule,
];

const DGI_MODULES: any[] = [
  DgiButtonFabModule,
];


@NgModule({
  imports: [
    CommonModule,
    TesistasRoutingModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    ...DGI_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    TesistasService,
    PersonasService,
  ],
  entryComponents: [
    FormNewComponent,
    FormEditComponent,
    FormVinculeComponent,
  ],
})
export class TesistasModule { }
