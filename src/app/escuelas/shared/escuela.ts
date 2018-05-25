export class Escuela {
    constructor(
        public nombre: string,
        public alias: string,
        public activo: boolean,
        public logo: string | any,
        public mision: string,
        public vision: string,
        public facultad: string,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string
    ) { }
}

export interface IEscuela {
    id: string; // uuid
    nombre: string;
    alias: string;
    activo: boolean;
    logo: string | any;
    mision: string;
    vision: string;
    facultad: string;
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
    results: IEscuela[];
}
