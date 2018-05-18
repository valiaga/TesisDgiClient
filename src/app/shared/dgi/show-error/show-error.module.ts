/**
 * @license
 * Copyright Devotion Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Reveal ShowError component para validaciones de formularios reactivos.
 *
 * @example
 *
 * ```
 * <dgi-show-error
 *   [group] = "myForm"
 *   [controlName] = "'myContolName'"
 *   ></dgi-show-error>
 * ```
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DgiToolsService } from './services/tools.service';
import { DgiValidatorsService } from './services/validators.service';
import { DgiShowErrorComponent } from './show-error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';

export { DgiValidatorsService } from './services/validators.service';

const COMPONENTS: any[] = [DgiShowErrorComponent];

const MATERIAL_MODULES: any[] = [
    MatFormFieldModule,
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ...MATERIAL_MODULES,
    ],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: [
        DgiToolsService,
        DgiValidatorsService,
    ],
})
export class DgihowErrorModule { }
