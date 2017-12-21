export class LineaInvestigacion {
    constructor(
        public nombre: string,
        public descripcion: string,
        public activo: boolean,
        public escuela: string,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string
    ){}
}

export interface ILineaInvestigacion {
    id: string; //uuid
    nombre: string;
    descripcion: string;
    activo: boolean;
    escuela: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
}