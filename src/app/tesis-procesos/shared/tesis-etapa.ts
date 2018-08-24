/**
 * Clase para crear objetos de tipo TesisEtapa
 */
export class TesisEtapa {

    constructor(
        public etapa?: string,
        public fecha_inicio?: boolean,
        public fecha_fin?: string,
        public tesis_proceso?: string,
        public activo?: boolean,

        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string // uuid
    ) {
    }
}

export interface ITesisEtapa {
    id: string; // uuid
    etapa: string;
    fecha_inicio: string;
    fecha_fin: string;
    tesis_proceso: string;
    activo: boolean;

    fecha_creacion: string;
    fecha_actualizacion: string;

}
