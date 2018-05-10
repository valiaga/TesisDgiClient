export class Requisito {
    constructor(
        public nombre: string,
        public descripcion: string,
        public activo: string,
        public plazo_dias: string,
        public tipo: number,
        public tarea: string,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string
    ) { }
}

export interface IRequisito {
    id: string; // uuid
    nombre: string;
    descripcion: string;
    activo: string;
    plazo_dias: string;
    tipo: number;
    tarea: string;
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
    results: IRequisito[];
}
