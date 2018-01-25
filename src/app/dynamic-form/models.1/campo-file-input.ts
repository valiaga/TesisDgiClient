import { CampoBase } from './campo-base';

export class CampoFileInput extends CampoBase<string> {
    controlType = 'input';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
