import { CampoBase } from "./campo-base";

export class CampoInput extends CampoBase<string>{
    controlType = 'input';
    type: string;

    max: number;
    min: number;

    constructor(options: {} = {}){
        super(options);
        this.type = options['type'] || '';
        this.max = options['max'] || '';
        this.min = options['min'] || '';
    }
}