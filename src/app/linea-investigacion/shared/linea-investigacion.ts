export class LineaInvestigacion {
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