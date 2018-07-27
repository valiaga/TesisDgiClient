import { ValidatorFn } from '@angular/forms';
import { Validation } from './validation';

export interface FieldConfig {
    disabled?: boolean;
    label?: string;
    name: string;
    options?: any[];
    placeholder?: string;
    type: string;
    required?: boolean;
    validation?: ValidatorFn[];
    value?: any;
    width?: number;
    directionVertical?: boolean; /** Only Radio */
    align?: string; /** Only checkboxs */


    id: string;
    model_name?: string;
    model_pk?: string;
    model_label?: string;
    json?: string;
    formulario?: string;
    icon?: string;
    prefix?: string;
    hint_start?: string;
    hint_end_count_text?: boolean;
    multiselect?: boolean;
    order?: number;
    fecha_creacion?: string;
    fecha_actualizacion?: string;
    campovalidation_set?: Validation[];
    multiple_fileinput?: boolean;
    accept_fileinput?: string;
}
