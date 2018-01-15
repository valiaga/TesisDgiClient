import { Component, OnInit, group } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config';

@Component({
  selector: 'dgi-form-input',
  template: `
  <!--
  <div
    class="dynamic-field form-input"
    [formGroup]="group">
    <label>{{ config.label }}</label>
    <input
      type="text"
      [attr.placeholder]="config.placeholder"
      [formControlName]="config.name" />
  </div>-->

  <mat-form-field
    [hideRequiredMarker]="[!config.required]"
    [formGroup]="group"
    [floatLabel]="['auto']">

    <input
      matInput [placeholder]="config.label" [formControlName]="config.name"
      [id]="config.name" [type]="config.type" [required]="[config.required]"
      >
    <!-- <dgi-form-validator [group]="group" [config]="config"></dgi-form-validator>-->
  </mat-form-field>
  `,
  styles: [
    `
    :host {
      /* display: flex;
      flex-wrap: wrap;*/
      /*justify-content: center; */
      /* margin-top: 25px; */
    }
    /*
    input {
      display: block;
      font-family: inherit;
      font-size: 14px;
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.1);
      outline: none;
      padding: 10px 15px;
      color: rgba(0, 0, 0, 0.7);
      &:focus {
        border: 1px solid rgba(0, 0, 0, 0.4);
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
      }
    }*/
    `
  ]
})
export class FormInputComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  constructor() { }

  ngOnInit() {
  }
}
