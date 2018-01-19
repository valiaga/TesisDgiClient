import { CampoBase } from './campo-base';

export class CampoInput extends CampoBase<string> {
    controlType = 'input';
    type: string;

    max: number; // number
    min: number; // number
    minLength: number; // text
    maxLength: number; // text

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
        this.max = options['max'] || '';
        this.min = options['min'] || '';
        this.minLength = options['minLength'] || '';
        this.maxLength = options['maxLength'] || '';
    }
}
