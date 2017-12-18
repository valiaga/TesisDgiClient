export class Proyecto {
    constructor(
        public titulo: string,
        public estado: string,
        public resumen?: string,
        public archivo?: string,
        public fecha_fin?: string,
        public fecha_sustentacion?: string,
        
        public dictaminador?: string,
        public asesor?: string,
        public jurado?: string,
        public tesista?: string,
        public linea_investigacion?: string,
        public tesis_proceso?: string,
        public id?: string //uuid
    ){}
}

// export interface iProyecto implements iProyecto {

// }
