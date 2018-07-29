import { NgModule } from '@angular/core';

import { DocumentosComponent } from './documentos.component';
import { DocumentosRoutingModule } from './documentos-routing.module';
import { CommonModule } from '@angular/common';
import { DocumentosService } from './shared/documentos.service';
import { FindPageComponent } from './containers';
import {
    SearchComponent, ListComponent,
    FormNewComponent, FormEditComponent,
} from './components';
import { DgiButtonFabModule } from '@dgi/button-fab';
import {
    MatCardModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatDatepickerModule,
    MatCheckboxModule, MatButtonModule, MatIconModule,
    MatMenuModule, MatTooltipModule, MatAutocompleteModule,
    MatTableModule,
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS: any[] = [
    DocumentosComponent,
    FindPageComponent,
    ListComponent,
    SearchComponent,
    FormNewComponent,
    FormEditComponent,
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
        ReactiveFormsModule,
        DocumentosRoutingModule,
        ...MATERIAL_MODULES,
        ...DGI_MODULES,
    ],
    exports: [],
    declarations: [
        ...COMPONENTS,
    ],
    entryComponents: [
        FormNewComponent,
        FormEditComponent,
    ],
    providers: [
        DocumentosService,
    ],
})
export class DocumentosModule { }
