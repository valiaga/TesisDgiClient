export class Formulario {
    constructor(
        public nombre: string,
        public alias: string,
        public descripcion: boolean,
        public tarea: string,
        public orden: number,
        public width: string,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string
    ) { }
}

export interface IFormulario {
    id: string; // uuid
    nombre: string;
    alias: string;
    descripcion: boolean;
    tarea: string;
    orden: string;
    width: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
}
