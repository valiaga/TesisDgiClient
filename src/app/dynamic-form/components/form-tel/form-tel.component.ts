import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormTools } from '../../../shared/form-tools.service';
import { FieldConfig } from '../../models/field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dgi-form-tel',
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
  `,
  styles: []
})
export class FormTelComponent implements OnInit, OnChanges {
  public config: FieldConfig;
  public group: FormGroup;
  formTools: FormTools;

  // constructor(private formToolsService: FormToolsService) { }
  constructor() { }

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
