/**
 * clase para crear objetos de tipo Proceso
 */
export class Proceso {
    constructor(
        public nombre: string,
        public descripcion: string,
        public activo: boolean,
        public fecha_creacion: string,
        public fecha_actualizacion: string,
        public id?: string //uuid
    ){ }
}

export interface IProceso {
    id: string; //uuid
    nombre: string;
    descripcion: string;
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
    results: IProceso[];
}
  