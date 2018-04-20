/**
 * clase para crear objetos de tipo RolProceso
 */
export class RolProceso {
    constructor(
        public nombre: string,
        public alias: string,
        public descripcion: string,
        public activo: boolean,
        public proceso: any,
        public fecha_creacion: string,
        public fecha_actualizacion: string,
        public id?: string // uuid
    ) { }
}

export interface IRolProceso {
    id: string; // uuid
    nombre: string;
    alias: string;
    descripcion: string;
    activo: boolean;
    proceso: any;
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
    results: IRolProceso[];
}
