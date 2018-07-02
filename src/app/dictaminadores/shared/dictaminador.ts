export class Dictaminador {
    constructor(
        public activo: boolean,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string
    ) { }
}

export interface IDictaminador {
    id: string; // uuid
    activo: boolean;
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
    results: IDictaminador[];
}
