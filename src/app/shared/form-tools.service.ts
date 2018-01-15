// import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

// @Injectable()
export class FormTools {
  // export class FormToolsService {

  constructor(public form: FormGroup) { }

  hasErrorsToShow(field: string) {
    const control = this.getControl(field);
    return control && control.invalid && this.shoulBeValid(control);
  }

  getErrors(field: string) {
    const control = this.getControl(field);
    return control && control.errors;
  }

  getControl(field: string) {
    return this.form && this.form.get(field);
  }

  shoulBeValid(control) {
    return (control.touched || control.dirty);
  }
}
