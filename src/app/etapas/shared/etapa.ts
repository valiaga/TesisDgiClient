export class Etapa {
    constructor(
        public nombre: string,
        public descripcion: string,
        public proceso: string,
        public anterior: string,
        public plazo_dias: number,
        public tarea_activador: string,
        public tarea_desactivador: string,
        public orden: number,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string,
    ) { }
}

export interface IEtapa {
    id: string; // uuid
    nombre: string;
    descripcion: string;
    proceso: string;
    anterior: string;
    plazo_dias: number;
    tarea_activador: string;
    tarea_desactivador: string;
    orden: number;
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
    results: IEtapa[];
}
