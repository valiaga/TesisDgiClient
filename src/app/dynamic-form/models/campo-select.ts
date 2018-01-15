import { CampoBase } from "./campo-base";

export class CampoSelect extends CampoBase<string> {
    controlType = 'select';
    options: {key: string, value: string}[]=[];
    default?: any

    constructor(options: {} = {}){
        super(options);
        this.options = options['options'] || [];
        this.default = options['default'] || [];
    }
}