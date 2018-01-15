import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config';

@Component({
  selector: 'dgi-form-select',
  template: `
  <!--
  <div
    class="dynamic-field form-select"
    [formGroup]="group">
    <label>{{ config.label }}</label>
    <select [formControlName]="config.name">
      <option value="">{{ config.placeholder }}</option>
      <option *ngFor="let option of config.options">
        {{ option }}
      </option>
    </select>
  </div>
  -->
  <mat-form-field
    [formGroup]="group"
    [hideRequiredMarker]="[!config.required]"
    [floatLabel]="['auto']">
    <mat-select [placeholder]="config.label" [id]="config.name" [formControlName]="config.name">
      <mat-option *ngFor="let option of config.options" [value]="option">{{ option }}</mat-option>
    </mat-select>
    <!-- <dgi-form-validator [group]="group" [config]="config"></dgi-form-validator> -->
  </mat-form-field>

  `,
  styles: [
    `
    :host {
      display: flex;
    }
    /*
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      text-indent: .01px;
      text-overflow: '';
      overflow: hidden;
      font-family: inherit;
      font-size: 14px;
      padding: 10px 15px;
      border-radius: 0;
      color: rgba(0, 0, 0, 0.7);
      border: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      outline: none;
      background:
        linear-gradient(45deg, transparent 50%, rgba(0, 0, 0, 0.7) 50%)
          no-repeat calc(100% - 20px) calc(1em + 4px),
        linear-gradient(135deg, rgba(0, 0, 0, 0.7) 50%, transparent 50%)
          no-repeat calc(100% - 15px) calc(1em + 4px);
      background-size: 5px 5px, 5px 5px;
      &:focus {
        border: 1px solid rgba(0, 0, 0, 0.4);
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
      }
    }*/
    `
  ]
})
export class FormSelectComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
