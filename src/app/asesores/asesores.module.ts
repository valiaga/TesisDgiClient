import { NgModule } from '@angular/core';

import { AsesoresComponent } from './asesores.component';
import { AsesoresRoutingModule } from './asesores-routing.module';
import {
    SearchComponent, ListComponent,
    FormNewComponent, FormEditComponent,
} from './components';
import { FindPageComponent } from './containers';
import { AsesoresService, AsesoresReactiveService } from './shared/asesores.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
    MatCardModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatDatepickerModule,
    MatCheckboxModule, MatButtonModule, MatIconModule, MatMenuModule,
} from '@angular/material';
import { DgiButtonFabModule } from '@dgi/button-fab';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS: any[] = [
    AsesoresComponent, ListComponent, SearchComponent,
    FindPageComponent, FormNewComponent, FormEditComponent,
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
    ],
    entryComponents: [
        FormNewComponent,
        FormEditComponent,
    ],
})
export class AsesoresModule { }
