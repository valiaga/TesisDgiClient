/**
 * Clase para crear objetos de tipo TesisTarea
 */
export class TesisTarea {

    constructor(
        public tarea?: string,
        public fecha_inicio?: boolean,
        public fecha_fin?: string,
        public tesis_etapa?: string,
        public activo?: boolean,

        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string // uuid
    ) {
    }
}

export interface ITesisTarea {
    id: string; // uuid
    tarea: string;
    fecha_inicio: string;
    fecha_fin: string;
    tesis_etapa: string;
    activo: boolean;

    fecha_creacion: string;
    fecha_actualizacion: string;

}
