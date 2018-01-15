import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dgi-form-validator',
  // encapsulation: ViewEncapsulation.Native,
  template: `
  <mat-error *ngIf="isRequired">
    <!-- {{ M.required }} -->
    required
  </mat-error>
  <mat-error *ngIf="isEmail && !isRequired">
    <!-- {{ M.email }} -->
    email
  </mat-error>
  <mat-error *ngIf="isMinlength && !isRequired">
    <!-- {{ M.minlength }} {{ campo.minLength }} -->
    minLength
  </mat-error>
  <mat-error *ngIf="isMaxlength && !isRequired">
    <!-- {{ M.maxlength }} {{ campo.maxLength }} -->
    maxlength
  </mat-error>
  <mat-error *ngIf="isMin">
    <!-- {{ M.min }} {{ campo.min }} -->
    min
  </mat-error>
  <mat-error *ngIf="isMax && !isMin">
    <!-- {{ M.max }} {{ campo.max }} -->
    max
  </mat-error>
  `,
  styles: []
})
export class FormValidatorComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() config: FieldConfig;

  constructor() { }

  ngOnInit() {
  }

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
}
