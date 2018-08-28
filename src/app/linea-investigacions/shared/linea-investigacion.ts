export class LineaInvestigacion {
    constructor(
        public nombre: string,
        public descripcion: string,
        public activo: boolean,
        public escuela: string,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string,
    ) { }
}

export interface ILineaInvestigacion {
    id: string; // uuid
    nombre: string;
    descripcion: string;
    activo: boolean;
    escuela: string;
    fecha_creacion: string;
    fecha_actualizacion: string;

    escuela_nombre: string;
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
    results: ILineaInvestigacion[];
}
