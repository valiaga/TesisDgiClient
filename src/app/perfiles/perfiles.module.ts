import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilesRoutingModule } from './perfiles-routing.module';
import { PerfilesComponent } from './perfiles.component';
import { FindPageComponent } from './containers';
import { DgiButtonFabModule } from '@dgi/button-fab';
import {
  MatCardModule, MatDialogModule, MatFormFieldModule,
  MatInputModule, MatRadioModule, MatDatepickerModule,
  MatCheckboxModule, MatButtonModule, MatIconModule,
  MatMenuModule, MatTooltipModule, MatAutocompleteModule, MatTableModule,
} from '@angular/material';
import { FormNewComponent, ListComponent, SearchComponent } from './components';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonasService } from '../personas/shared/personas.service';
import { UsersService } from '../users/shared/users.service';


const COMPONENTS: any[] = [
  PerfilesComponent,

  FindPageComponent,
  // ProyectosPageComponent,

  // FormEditComponent,
  // FormVinculeComponent,
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

  CdkTableModule,
  MatTableModule,
];

const DGI_MODULES: any[] = [
  DgiButtonFabModule,
];

@NgModule({
  imports: [
    CommonModule,
    PerfilesRoutingModule,
    ReactiveFormsModule,

    ...MATERIAL_MODULES,
    ...DGI_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    PersonasService,
    UsersService,
  ],
  entryComponents: [
    FormNewComponent,
  ]
})
export class PerfilesModule { }
