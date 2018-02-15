export class Campo {
}

export interface ICampo {
    id: string;
    label: string;
    name: string;
    type: string;
    required: boolean;
    width: number;
    placeholder: string;
    model: string;
    json: string;
    formulario: string;
    icon: string;
    prefix: string;
    hint_start: string;
    hint_end_count_text: boolean;
    disabled: boolean;
    multiselect: boolean;
    order: number;
    // campovalidation_set:
    fecha_creacion: string;
    fecha_actualizacion: string;
}
