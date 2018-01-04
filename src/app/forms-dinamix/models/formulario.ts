export class Formulario {
    constructor(
        public nombre: string,
        public alias: string,
        public descripcion: string,
        public tarea: string,
        public orden: number,
        public fecha_creacion?: string,
        public fecha_actualizacion?: string,
        public id?: string //uuid
    ) {}
}

export interface IFormulario {
    id: string; //uuid
    nombre: string;
    alias: string;
    descripcion: string;
    tarea: string;
    orden: number;
    fecha_creacion: string;
    fecha_actualizacion: string;
}
