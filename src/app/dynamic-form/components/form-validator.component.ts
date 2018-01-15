import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config';
import { ViewEncapsulation } from '@angular/core';
import { MESSAGES } from '../../../config/messages';

@Component({
  selector: 'dgi-form-validator',
  // encapsulation: ViewEncapsulation.Native,
  template: `
  <span >
    <!-- {{ M.required }} -->
    {{ getMsmError }}
  </span>
  <!--
  <mat-error *ngIf="isEmail && !isRequired">
     {{ M.email }} 
    email
  </mat-error>
  <mat-error *ngIf="isMinlength && !isRequired">
     {{ M.minlength }} {{ campo.minLength }}
    minLength
  </mat-error>
  <mat-error *ngIf="isMaxlength && !isRequired">
    {{ M.maxlength }} {{ campo.maxLength }}
    maxlength
  </mat-error>
  <mat-error *ngIf="isMin">
    {{ M.min }} {{ campo.min }}
    min
  </mat-error>
  <mat-error *ngIf="isMax && !isMin">
    {{ M.max }} {{ campo.max }} 
    max
  </mat-error>-->
  `,
  styles: []
})
export class FormValidatorComponent implements OnInit {

  @Input() hasError: any;
  // @Input() config: FieldConfig;

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

/*
  get isRequired() {
    return this.group.controls[this.config.name].hasError('required');
  }

  get isEmail() {
    return this.group.controls[this.config.name].hasError('email');
  }

  get isMinlength() {
    return this.group.controls[this.config.name].hasError('minlength');
  }

  get isMaxlength() {
    return this.group.controls[this.config.name].hasError('maxlength');
  }

  get isMax() {
    return this.group.controls[this.config.name].hasError('max');
  }

  get isMin() {
    return this.group.controls[this.config.name].hasError('min');
  }
*/
}
