/**
 * Clase para crear objetos de tipo TesisProceso
 */
export class TesisProceso {

    constructor(
        public proyecto_titulo?: string,
        public proceso_id?: string,
        
        // public descripcion: string,
        public estado?: boolean,
        public fecha_inicio?: string,
        public fecha_fin?: string,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string //uuid
    ){
    }
}

export interface ITesisProceso {
    estado: boolean;
    fecha_inicio: string;
    fecha_fin: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
    id: string; //uuid
}