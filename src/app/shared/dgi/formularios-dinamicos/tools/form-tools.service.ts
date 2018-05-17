import { Injectable } from '@angular/core';
import { FieldConfig, Formulario } from '../models';

@Injectable()
export class FormToolsService {

  constructor() { }

  getDateForControl(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  getControlClass(config: FieldConfig) {
    const width = (config && config.width) ? config.width : 100;
    const objectClass = {
      'input-100': (width === 100) ? true : false,
      'input-50': (width === 50) ? true : false,
      'input-25': (width === 25) ? true : false,
      'input-20': (width === 20) ? true : false,
      'input-10': (width === 10) ? true : false,
    };
    return objectClass;
  }

  getFormClass(formulario: Formulario) {
    const width = (formulario && formulario.width) ? formulario.width : 100;
    const objectClass = {
      'input-100': (width === 100) ? true : false,
      'input-50': (width === 50) ? true : false,
      'input-33': (width === 33) ? true : false,
      'input-25': (width === 25) ? true : false,
      'input-20': (width === 20) ? true : false,
      'input-10': (width === 10) ? true : false,
    };
    return objectClass;
  }

}
