export class Tarea {
    constructor(
        public id: string, // uuid
        public nombre: string,
        public descripcion: string,
        public etapa: string,
        public anterior: string,
        public rol_ejecuta: string[],
        public plazo_dias: string,
        public req_res_activador: string,
        public req_res_desactivador: string,

        public fecha_creacion: string,
        public fecha_actualizacion: string,
    ) { }

}

export class ITarea {
    id: string; // uuid
    nombre: string;
    descripcion: string;
    etapa: string;
    anterior: string;
    rol_ejecuta: string[];
    plazo_dias: string;
    req_res_activador: string;
    req_res_desactivador: string;

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
    results: ITarea[];
}
