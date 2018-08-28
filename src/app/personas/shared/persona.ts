export class Persona {
    constructor(
        public nombres: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public genero: string,
        public fecha_nacimiento: string,
        public direccion: string,
        public telefono: string,
        public celular: string,
        public num_doc: string,
        public carnet_extrangeria: string,
        public foto: string,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string,
    ) { }
}

export interface IPersona {
    id: string; // uuid
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    genero: string;
    fecha_nacimiento: string;
    direccion: string;
    telefono: string;
    celular: string;
    num_doc: string;
    carnet_extrangeria: string;
    foto: string;
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
    results: IPersona[];
}
