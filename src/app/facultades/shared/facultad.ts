export class Facultad {
    constructor(
        public nombre: string,
        public alias: string,
        public activo: boolean,
        public logo: string,
        public tema: string,
        public mision: string,
        public vision: string,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string,
    ) {}
}

export interface IFacultad {
    id: string; // uuid
    nombre: string;
    alias: string;
    activo: boolean;
    logo: string;
    tema: string;
    mision: string;
    vision: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
}
