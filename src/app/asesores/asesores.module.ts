import { NgModule } from '@angular/core';

import { AsesoresComponent } from './asesores.component';
import { AsesoresRoutingModule } from './asesores-routing.module';
import {
    SearchComponent, ListComponent,
    FormNewComponent, FormEditComponent,
    FormVinculeComponent,
} from './components';
import { FindPageComponent, ProyectosPageComponent } from './containers';
import { AsesoresService, AsesoresReactiveService } from './shared/asesores.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
    MatCardModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatDatepickerModule,
    MatCheckboxModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, MatAutocompleteModule,
} from '@angular/material';
import { DgiButtonFabModule } from '@dgi/button-fab';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonasService } from '../personas/shared/personas.service';

const COMPONENTS: any[] = [
    AsesoresComponent, ListComponent, SearchComponent,
    FindPageComponent, FormNewComponent, FormEditComponent,
    ProyectosPageComponent, FormVinculeComponent,
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
        RouterModule,
        AsesoresRoutingModule,
        ReactiveFormsModule,

        ...MATERIAL_MODULES,
        ...DGI_MODULES,
    ],
    exports: [],
    declarations: [
        ...COMPONENTS,
    ],
    providers: [
        AsesoresService,
        AsesoresReactiveService,
        PersonasService,
    ],
    entryComponents: [
        FormNewComponent,
        FormEditComponent,
        FormVinculeComponent,
    ],
})
export class AsesoresModule { }
