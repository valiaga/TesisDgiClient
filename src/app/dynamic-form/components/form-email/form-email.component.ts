import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormToolsService } from '../../../shared/form-tools.service';

@Component({
  selector: 'dgi-form-email',
  template: `
  <!-- [hideRequiredMarker]="!config.required"-->
  <mat-form-field
    [ngClass]="getControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']">

    <input
      matInput [placeholder]="config.label" [formControlName]="config.name"
      [id]="config.name" [type]="config.type" [required]="config.required"
      >

      <!-- <mat-error *ngIf="formTools.hasErrorsToShow(config.name)"> -->
      <mat-error *ngIf="mustShowErrors(config.name)">
        <!-- <dgi-form-validator [hasError]="formTools.getErrors(config.name)"></dgi-form-validator> -->
        <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
      </mat-error>
  `,
  styleUrls: ['./form-email.component.scss'],
})
export class FormEmailComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  // formTools: FormTools;

  constructor(private formToolsService: FormToolsService) { }
  // constructor() { }

  ngOnInit() {
    // this.formTools = new FormTools(this.group);
  }

  // ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
  // if (changes['form']) {
  // this.formTools = new FormTools(this.group);
  // }
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
