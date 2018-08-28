import { Component, OnInit } from '@angular/core';
import { FormToolsService } from '../../../shared/form-tools.service';
import { FieldConfig } from '../../models/field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dgi-form-tel',
  template: `
  <!-- [hideRequiredMarker]="[!config.required]" -->
  <mat-form-field
    [ngClass]="getControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']">
    <span matPrefix>{{ codePostal }} &nbsp;</span>
    <input
      matInput [placeholder]="config.label" [formControlName]="config.name"
      [id]="config.name" [type]="config.type" [required]="config.required"
      >
    <!-- <mat-icon matSuffix>mode_edit</mat-icon> -->
    <mat-icon matSuffix>phone</mat-icon>

    <!-- <mat-error *ngIf="formTools.hasErrorsToShow(config.name)"> -->
    <mat-error *ngIf="mustShowErrors(config.name)">
      <!-- <dgi-form-validator [hasError]="formTools.getErrors(config.name)"></dgi-form-validator> -->
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error>
  </mat-form-field>
  `,
  styleUrls: ['./form-tel.component.scss'],
})
export class FormTelComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public codePostal = '+51';
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
