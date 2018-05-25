export class Campo {
    constructor(
        public label: string,
        public name: string,
        public type: string,
        public required: boolean,
        public width: number,
        public validation: any[],
        public placeholder: string,
        public model: string,
        public json: string,
        public formulario: string,
        public icon: string,
        public prefix: string,
        public hint_start: string,
        public hint_end_count_text: boolean,
        public disabled: boolean,
        public multiselect: boolean,
        public order: number,

        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string
    ) { }
}

export interface ICampo {
    id: string; // uuid

    label: string;
    name: string;
    type: string;
    required: boolean;
    width: number;
    validation: any[];
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

    fecha_creacion: string;
    fecha_actualizacion: string;

}

class Options {
    count: number; // total_count
    pages: number;
    page: number;
    next: number;
    previous: number;
    range: string;
    page_size: number;
}

export interface IResponse {
    options: Options;
    results: ICampo[];
}
