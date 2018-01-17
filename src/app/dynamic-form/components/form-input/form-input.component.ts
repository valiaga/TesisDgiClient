import { Component, SimpleChange, OnInit, group, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config';
import { FormTools } from '../../../shared/form-tools.service';

@Component({
  selector: 'dgi-form-input',
  template: `
  <mat-form-field
    [hideRequiredMarker]="[!config.required]"
    [formGroup]="group"
    [floatLabel]="['auto']">

    <input
      matInput [placeholder]="config.label" [formControlName]="config.name"
      [id]="config.name" [type]="config.type" required
      >

    <mat-error *ngIf="formTools.hasErrorsToShow(config.name)">
    <!-- <mat-error *ngIf="mustShowErrors(config.name)">-->
      <dgi-form-validator [hasError]="formTools.getErrors(config.name)"></dgi-form-validator>
    <!-- <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>-->
    </mat-error>
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
export class FormInputComponent implements OnInit, OnChanges {
  public config: FieldConfig;
  public group: FormGroup;
  formTools: FormTools;
  // private required = false;

  // constructor(private formToolsService: FormToolsService) {
  constructor() {

  }

  ngOnInit() {
    this.formTools = new FormTools(this.group);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes['form']) {
      this.formTools = new FormTools(this.group);
    }
  }

  // mustShowErrors(controlName: string): boolean {
    // return this.formToolsService.mustShowErrors(this.group, controlName);
  // }

  // getControlErrors(controlName: string) {
    // return this.formToolsService.getControlErrors(this.group, controlName);
  // }

}

