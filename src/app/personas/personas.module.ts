import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasService, PersonasReactiveService } from './shared/personas.service';
import { PersonasComponent } from './personas.component';
import {
  ListComponent, SearchComponent,
  FormNewComponent, FormEditComponent
} from './components';
import { FindPageComponent } from './containers';
import {
  MatCardModule, MatDialogModule,
  MatFormFieldModule, MatInputModule,
  MatRadioModule, MatDatepickerModule,
  MatCheckboxModule, MatButtonModule,
  MatIconModule, MatMenuModule,
  MatTooltipModule, MatAutocompleteModule
} from '@angular/material';
import { DgiButtonFabModule } from '@dgi/button-fab';
import { ReactiveFormsModule } from '@angular/forms';


const COMPONENTS: any[] = [
  PersonasComponent, ListComponent, SearchComponent,
  FindPageComponent, FormNewComponent, FormEditComponent,
  // ProyectosPageComponent, FormVinculeComponent,
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
    PersonasRoutingModule,
    ReactiveFormsModule,

    ...DGI_MODULES,
    ...MATERIAL_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    PersonasService,
    PersonasReactiveService,
  ],
  entryComponents: [
    FormEditComponent,
    FormNewComponent,
  ],
})
export class PersonasModule { }
