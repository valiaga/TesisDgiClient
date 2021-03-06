class Options {
    count: number; // total_count
    pages: number;
    page: number;
    next: number;
    previous: number;
    range: string;
    page_size: number;
}

export interface IResponse {
    options: Options;
    results: any[];
}

export interface IModel {
    id: string;
    fecha_creacion: String;
    fecha_actualizacion: String;
}
