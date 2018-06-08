import { FieldConfig } from './field-config';
import { FormGroup } from '@angular/forms';

/**
 * Field = Campo
 */
export interface Field {
    config: FieldConfig;
    group: FormGroup;
}
