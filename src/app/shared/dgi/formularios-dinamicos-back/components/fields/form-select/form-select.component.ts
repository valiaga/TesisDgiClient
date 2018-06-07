import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-form-select',
  template: `
  <!-- [hideRequiredMarker]="[config.required]" -->
  <mat-form-field
    [ngClass]="getWidthControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']">
    <mat-select [required]="config.required" [placeholder]="config.label" [id]="config.name" [formControlName]="config.name">
      <mat-option *ngFor="let option of config.options" [value]="option">{{ option }}</mat-option>
    </mat-select>
    <!--
    <mat-error *ngIf="mustShowErrors(config.name)">
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error>
    -->
  `,
  styleUrls: ['./form-select.component.scss']
})
export class DgiFormSelectComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
  }

  public getWidthControlClass() {
    return this.formWidthToolsService.getWidthControlClass(this.config);
  }

  // public mustShowErrors(controlName: string): boolean {
  //   return this.formToolsService.mustShowErrors(this.group, controlName);
  // }

  // public getControlErrors(controlName: string) {
  //   return this.formToolsService.getControlErrors(this.group, controlName);
  // }

}
