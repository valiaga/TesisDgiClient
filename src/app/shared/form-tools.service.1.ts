import { AbstractControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

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

  // getControlErrorRequired(form: FormGroup, controlName: string): boolean {
    // return false;
  // }

  getDateForControl(date: Date): string {
    return date.toISOString().substring(0, 10);
  }
  // hasErrorsToShow(field: string) {
    // const control = this.getControl(field);
    // return control && control.invalid && this.shoulBeValid(control);
  // }

  // getErrors(field: string) {
    // const control = this.getControl(field);
    // return control && control.errors;
  // }

  // shoulBeValid(control) {
    // return (control.touched || control.dirty);
  // }
}
