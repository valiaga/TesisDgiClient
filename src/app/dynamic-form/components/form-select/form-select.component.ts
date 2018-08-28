import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config';
import { FormToolsService } from '../../../shared/form-tools.service';

@Component({
  selector: 'dgi-form-select',
  template: `
  <!-- [hideRequiredMarker]="[config.required]" -->
  <mat-form-field
    [ngClass]="getControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']">
    <mat-select [required]="config.required" [placeholder]="config.label" [id]="config.name" [formControlName]="config.name">
      <mat-option *ngFor="let option of config.options" [value]="option">{{ option }}</mat-option>
    </mat-select>
    <!--<mat-error *ngIf="formTools.hasErrorsToShow(config.name)"> -->
    <mat-error *ngIf="mustShowErrors(config.name)">
      <!-- <dgi-form-validator [hasError]="formTools.getErrors(config.name)"></dgi-form-validator> -->
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error>
  `,
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  // formTools: FormTools;

  constructor(private formToolsService: FormToolsService) { }
  // constructor() { }

  ngOnInit() {
    // this.formTools = new FormTools(this.group);
  }

  // ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
  //   if (changes['form']) {
  //     this.formTools = new FormTools(this.group);
  //   }
  // }
  public getControlClass() {
    return this.formToolsService.getControlClass(this.config);
  }

  public mustShowErrors(controlName: string): boolean {
    return this.formToolsService.mustShowErrors(this.group, controlName);
  }

  public getControlErrors(controlName: string) {
    return this.formToolsService.getControlErrors(this.group, controlName);
  }

}
