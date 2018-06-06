/**
 * @license
 * Copyright Devotion Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Reveal Formularios dinamicos.
 *
 * @example 1 one form
 *
 * ```
 * <dgi-dynamic-form [config]="formulario?.campos" #form="dgiDynamicForm" (submit)="submit($event)"></dgi-dynamic-form>
 *     {{ form?.valid }} {{ form?.value | json }}
 * ```
 *
 * @example 2 many forms
 *
 * ```
 * <dgi-many-dynamic-form [formularios]="formularios"></dgi-many-dynamic-form>
 * ```
 */

import { NgModule } from '@angular/core';
import { DgiDynamicFieldDirective } from './directives';
import { FormWidthToolsService } from './tools/form-width-tools.service';

import {
    DgiFormButtonComponent,
    DgiFormButtonSubmitComponent,
    DgiFormInputComponent,
    DgiFormNumberComponent,
    DgiFormEmailComponent,
    DgiFormSelectComponent,
    DgiFormTelComponent,
    DgiFormTextareaComponent,
    DgiFormSlideToggleComponent,
    DgiFormDatepickerComponent,
    DgiFormPasswordComponent,
    DgiFormRadioComponent,
    DgiFormCheckboxComponent,
    DgiDynamicFormComponent,
    DgiManyDynamicFormComponent,
    DgiFormFileInputComponent,
} from './components';
import {
    MatFormFieldModule, MatButtonModule,
    MatCheckboxModule, MatDatepickerModule,
    MatRadioModule, MatSelectionListChange,
    MatSelectModule, MatSliderModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CovalentFileModule } from '@covalent/core';

const DIRECTIVES: any[] = [
    DgiDynamicFieldDirective,
];

const COMPONENTS_FORM: any[] = [
    /** Components containers */
    DgiDynamicFormComponent,
    DgiManyDynamicFormComponent,
];

const COMPONENTS_FIELD: any[] = [
    /** Components form */
    DgiFormButtonComponent,
    DgiFormButtonSubmitComponent,
    DgiFormInputComponent,
    DgiFormNumberComponent,
    DgiFormEmailComponent,
    DgiFormSelectComponent,
    DgiFormTelComponent,
    DgiFormTextareaComponent,
    DgiFormSlideToggleComponent,
    DgiFormPasswordComponent,
    DgiFormDatepickerComponent,
    DgiFormRadioComponent,
    DgiFormCheckboxComponent,
    DgiFormFileInputComponent
];

const MATERIAL_MODULES: any[] = [
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
];

const COVALENT_MODULES: any[] = [
    CovalentFileModule,
];

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ...MATERIAL_MODULES,
        ...COVALENT_MODULES,
    ],
    exports: [
        ...COMPONENTS_FORM,
    ],
    entryComponents: [
        ...COMPONENTS_FIELD,
    ],
    declarations: [
        ...COMPONENTS_FORM,
        ...COMPONENTS_FIELD,
        ...DIRECTIVES,
    ],
    providers: [
        FormWidthToolsService,
    ],
})
export class DgiFormulariosDinamicosModule { }
