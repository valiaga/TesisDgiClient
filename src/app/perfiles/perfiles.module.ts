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
  MatMenuModule, MatTooltipModule, MatAutocompleteModule,
} from '@angular/material';
import { ListComponent, SearchComponent } from './components';


const COMPONENTS: any[] = [
  PerfilesComponent,

  FindPageComponent,
  // ProyectosPageComponent,

  // FormEditComponent,
  // FormVinculeComponent,
  // FormNewComponent,
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
    PerfilesRoutingModule,
    ...MATERIAL_MODULES,
    ...DGI_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class PerfilesModule { }
