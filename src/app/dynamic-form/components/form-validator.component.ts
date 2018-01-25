import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config';
import { ViewEncapsulation } from '@angular/core';
import { MESSAGES } from '../../../config/messages';

@Component({
  selector: 'dgi-form-validator',
  template: `
  <span >
    {{ getMsmError }}
  </span>
  `,
  styles: []
})
export class FormValidatorComponent implements OnInit {

  @Input() hasError: any;

  constructor() { }

  ngOnInit() {
  }

  get getMsmError() {
    if (this.hasError.required) {
      return MESSAGES.formValidators.required;
    } else if (this.hasError.minlength) {
      return `${MESSAGES.formValidators.minlengthRequiredLength}${this.hasError.minlength.requiredLength}
      ${MESSAGES.formValidators.minlengthActualLength}${this.hasError.minlength.actualLength}`;
    } else if (this.hasError.maxlength) {
      return `${MESSAGES.formValidators.maxlengthRequiredLength}${this.hasError.maxlength.requiredLength}
      ${MESSAGES.formValidators.maxlengthActualLength}${this.hasError.maxlength.actualLength}`;
    } else if (this.hasError.email) {
      return MESSAGES.formValidators.email;
    } else if (this.hasError.min) {
      return `${MESSAGES.formValidators.minRequired}${this.hasError.min.min}
      ${MESSAGES.formValidators.minActual}${this.hasError.min.actual}`;
    } else if (this.hasError.max) {
      return `${MESSAGES.formValidators.maxRequired}${this.hasError.max.max}
      ${MESSAGES.formValidators.maxActual}${this.hasError.max.actual}`;
    }
  }
}
