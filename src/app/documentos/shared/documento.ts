export interface IDocumento {
    id: string; // uuid

    nombre: string;
    alias: string;
    descripcion: string;
    llave_documento: string;
    activo: boolean;

    fecha_creacion: string;
    fecha_actualizacion: string;
}
