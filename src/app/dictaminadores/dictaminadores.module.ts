import { NgModule } from '@angular/core';

import { DictaminadoresComponent } from './dictaminadores.component';
import { DictaminadoresRoutingModule } from './dictaminadores-routing.module';
import { CommonModule } from '@angular/common';
import { FindPageComponent, ProyectosPageComponent } from './containers';
import { FormEditComponent, FormNewComponent, ListComponent, SearchComponent } from './components';
import {
    MatCardModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatRadioModule,
    MatDatepickerModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule
} from '@angular/material';
import { DgiButtonFabModule } from '@dgi/button-fab';
import { ReactiveFormsModule } from '@angular/forms';
import { DictaminadoresReactiveService, DictaminadoresService } from './shared/dictaminadores.service';

const COMPONENTS: any[] = [
    DictaminadoresComponent,
    FindPageComponent,
    ProyectosPageComponent,

    FormEditComponent,
    FormNewComponent,
    ListComponent,
    SearchComponent
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
];

const DGI_MODULES: any[] = [
    DgiButtonFabModule,
];

@NgModule({
    imports: [
        CommonModule,
        DictaminadoresRoutingModule,
        ReactiveFormsModule,
        ...MATERIAL_MODULES,
        ...DGI_MODULES,
    ],
    exports: [],
    declarations: [
        ...COMPONENTS,
    ],
    providers: [
        DictaminadoresReactiveService,
        DictaminadoresService,
    ],
    entryComponents: [
        FormNewComponent,
        FormEditComponent,
    ]
})
export class DictaminadoresModule { }
