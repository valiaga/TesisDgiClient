import { Component, OnInit, Input } from '@angular/core';
import { CampoBase } from '../models/campo-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dgi-dynamic-form-campo',
  template: `
    <div [formGroup]="form">
      <!-- <label [attr.for]="campo.key">{{campo.label}}</label> -->
      <div [ngSwitch]="campo.controlType">
        <mat-form-field
          [hideRequiredMarker]="[!campo.required]"
          [floatLabel]="['auto']">
      
          <input *ngSwitchCase="'input'" 
              matInput [placeholder]="campo.label" [formControlName]="campo.key"
              [id]="campo-key" [type]="campo.type" [required]="[campo.required]"
              >
              <!-- [maxlength]="campo.max" [minlength]="campo.min" -->
          
          <mat-select [placeholder]="campo.label" *ngSwitchCase="'select'"
            [id]="campo.key" [formControlName]="campo.key">
            <mat-option *ngFor="let opt of campo.options" [value]="opt.key">{{opt.value}}</mat-option>
          </mat-select>
          
          <mat-error *ngIf="isValidRequired">
            {{ campo.label }} es <strong>requerido</strong>
          </mat-error>
          <mat-error *ngIf="isValidEmail">
            Por favor, introduce una dirección de correo electrónico válida.
          </mat-error>

          <mat-error *ngIf="isValidMax">
            {{ campo.label }} debe tener entre {{ campo.min }} a {{ campo.max }} caracteres.
          </mat-error>

          
          <mat-error *ngIf="isValidMin">
            mínimo {{ campo.min }}
          </mat-error>

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
  styles: []
})
export class DynamicFormCampoComponent implements OnInit {

  @Input() campo: CampoBase<any>;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get isValidRequired() {
    return this.form.controls[this.campo.key].hasError('required')
            // && this.form.controls[this.campo.key].touched;
  }
  
  get isValidEmail() {
    return this.form.controls[this.campo.key].hasError('email');
  }

  get isValidMax() {
    // return true;
    console.log(this.campo.key)
    console.log(this.form.controls[this.campo.key].hasError('maxLength'))
    return this.form.controls[this.campo.key].hasError('maxLength')
      // || this.form.controls[this.campo.key].hasError('minLength');
  }

  get isValidMin() {
    return this.form.controls[this.campo.key].hasError('minLength');
  }
  
}
