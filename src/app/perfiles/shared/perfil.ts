export class Perfil {
    constructor(
        public persona: any,
        public data_persona: any,
        public usuario: any,
        public data_usuario: any,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string
    ) { }
}

export interface IPerfil {
    id: string; // uuid
    persona: any;
    data_persona: any;
    usuario: any;
    data_usuario: any;
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
    results: IPerfil[];
}
