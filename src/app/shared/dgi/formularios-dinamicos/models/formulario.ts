import { FieldConfig } from './field-config';

export interface Formulario {
    id: string; // uuid
    nombre: string;
    alias: string;
    descripcion: string;
    tarea: string;
    orden: number;
    fecha_creacion: string;
    fecha_actualizacion: string;
    width: number;
    // fieldConfigs: FieldConfig[];
    campos: FieldConfig[];
}
