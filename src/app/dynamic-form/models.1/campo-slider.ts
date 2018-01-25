import { CampoBase } from './campo-base';

export class CampoSlider extends CampoBase<string> {
    controlType = 'slider';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
