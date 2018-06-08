import { FieldConfig } from './field-config';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

/**
 * Field = Campo
 */
export interface Field {
    config: FieldConfig;
    group: FormGroup;
    onUpdate: EventEmitter<string>;
}
