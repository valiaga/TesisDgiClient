import { CampoBase } from "./campo-base";

export class CampoSelect extends CampoBase<string> {
    controlType = 'select';
    options: {key: string, value: string}[]=[];

    constructor(options: {} = {}){
        super(options);
        this.options = options['options'] || [];
    }
}