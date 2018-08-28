import { Component, OnInit, Input } from '@angular/core';
import { CampoBase } from '../models.1/campo-base';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ControlService } from '../shared/control.service';
import { MESSAGES } from '../../../config/messages';

@Component({
  selector: 'dgi-dynamic-form-campo',
  template: `
    <div [formGroup]="form">
    <!--<label [attr.for]="campo.key">{{campo.label}}</label>-->

      <div [ngSwitch]="campo.controlType">
        <mat-form-field
          [hideRequiredMarker]="[!campo.required]"
          [floatLabel]="['auto']">

          <input *ngSwitchCase="'input'"
              matInput [placeholder]="campo.label" [formControlName]="campo.key"
              [id]="campo.key" [type]="campo.type" [required]="[campo.required]"
              >

              <!-- [maxlength]="campo.max" [minlength]="campo.min" -->

          <mat-select [placeholder]="campo.label" *ngSwitchCase="'select'"
            [id]="campo.key" [formControlName]="campo.key"
            >
            <mat-option *ngFor="let opt of campo.options" [value]="opt.key">{{opt.value}}</mat-option>
          </mat-select>
          <!--<span *ngIf="isTouchedAndisNotPristine">-->
            <!-- <mat-hint *ngIf="isValidRequired">Errors appear instantly!</mat-hint> -->
          <!--
            <mat-error *ngIf="form.controls[campo.key].hasError('required')">
              {{ M.required }}
              </mat-error>
              <mat-error *ngIf="form.controls[campo.key].hasError('email')
              && !form.controls[campo.key].hasError('required')">
              {{ M.email }}
              </mat-error>
              <mat-error *ngIf="form.controls[campo.key].hasError('minlength')
              && !form.controls[campo.key].hasError('required')">
              {{ M.minlength }} {{ campo.minLength }}
              </mat-error>
              <mat-error *ngIf="form.controls[campo.key].hasError('maxlength')
              && !form.controls[campo.key].hasError('required')">
              {{ M.maxlength }} {{ campo.maxLength }}
              </mat-error>
              <mat-error *ngIf="isValidMin">
              {{ M.min }} {{ campo.min }}
              </mat-error>
              <mat-error *ngIf="isValidMax && !isValidMin">
              {{ M.max }} {{ campo.max }}
            </mat-error>-->
      </mat-form-field>

    <!--
        <input *ngSwitchCase="'input'" [formControlName]="campo.key"
                [id]="campo.key" [type]="campo.type">
    -->
    <!--
    <select [id]="campo.key" *ngSwitchCase="'select'" [formControlName]="campo.key">
          <option *ngFor="let opt of campo.options" [value]="opt.key">{{opt.value}}</option>
        </select>
    -->
     </div>
      <!-- <div class="errorMessage" *ngIf="isValidRequired">{{campo.label}} is required</div> -->
    </div>
  `,
  styles: [],
  providers: [
    ControlService,
  ],
})
export class DynamicFormCampoComponent implements OnInit {

  @Input() campo: CampoBase<any>;
  @Input() form: FormGroup;

  public M: any;

  constructor() { }

  ngOnInit() {
    this.M = MESSAGES.formValidators;
  }

  // matcher = new MyErrorStateMatcher();

  get isValidRequired() {
    // return setTimeout(()=>this.form.controls[this.campo.key].hasError('required'), 0);
    return this.form.controls[this.campo.key].hasError('required');
  }

  get isValidEmail() {
    return this.form.controls[this.campo.key].hasError('email');
    // return setTimeout(()=>this.form.controls[this.campo.key].hasError('email'), 0);
  }

  get isValidMinLength() {
    return this.form.controls[this.campo.key].hasError('minLength');
  }
  get isValidMaxLength() {
    return this.form.controls[this.campo.key].hasError('maxLength');
  }
  get isValidMin() {
    return this.form.controls[this.campo.key].hasError('min');
  }
  get isValidMax() {
    return this.form.controls[this.campo.key].hasError('max');
  }

  get isTouched() {
    return this.form.controls[this.campo.key].touched;
  }
  get isNotPristine() {
    return setTimeout(() => !this.form.controls[this.campo.key].pristine , 0);
  }

  get isTouchedAndisNotPristine() {
    return this.isTouched || this.isNotPristine;
  }
}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
