import { AbstractControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { FieldConfig } from '../dynamic-form/models/field-config';
import { Form } from '../dynamic-form/models/form';

@Injectable()
export class FormToolsService {

  constructor() { }

  getControl(form: FormGroup, controlName: string): AbstractControl {
    return form.controls[controlName];
  }

  hasChanges(control: AbstractControl): boolean {
    return control && (control.dirty || control.touched);
  }

  mustShowErrors(form: FormGroup, controlName: string) {
    let hasErrorsToShow = false;
    const control = this.getControl(form, controlName);
    if (this.hasChanges(control)) {
      hasErrorsToShow = control.errors != null;
    }
    return hasErrorsToShow;
  }

  getControlErrors(form: FormGroup, controlName: string) {
    // const controlErrors = [];
    // let controlErrors = '';
    const control = this.getControl(form, controlName);
    // if (control && control.errors) {
    // Object.keys(control.errors).forEach(error => {
    // controlErrors.push(error);
    // controlErrors += error;
    // controlErrors = error;
    // });
    // }
    return control && control.errors;
  }

  getDateForControl(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  getControlClass(config: FieldConfig) {
    const width = (config && config.width) ? config.width : 100 ;
    const objectClass = {
      'input-100': (width === 100) ? true : false,
      'input-50': (width === 50) ? true : false,
      'input-25': (width === 25) ? true : false,
      'input-20': (width === 20) ? true : false,
      'input-10': (width === 10) ? true : false,
    };
    return objectClass;
  }

  getFormClass(formulario: Form) {
    const width = (formulario && formulario.width) ? formulario.width : 100 ;
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
