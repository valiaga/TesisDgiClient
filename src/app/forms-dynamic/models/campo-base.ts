export class CampoBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;

    constructor(options: {
        valor?: T,
        key?: string,
        label?: string;
        required?: boolean,
        order?: number,
        controlType?: string
    } = {}) {
        this.value = options.valor;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
}