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
