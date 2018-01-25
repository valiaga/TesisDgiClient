import { FieldConfig } from './field-config';

export interface Form {
    name: string;
    width: number;
    fieldConfigs: FieldConfig[];
}
