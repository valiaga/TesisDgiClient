import { Component, OnInit, EventEmitter } from '@angular/core';
import { FieldConfig } from '../../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-form-email',
  template: `
  <!-- [hideRequiredMarker]="!config.required"-->
  <mat-form-field
    [ngClass]="getWidthControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']">
    <span *ngIf="config.prefix" matPrefix>{{ config.prefix }} &nbsp;</span>
    <input
      matInput [placeholder]="config.label" [formControlName]="config.name"
      [id]="config.name" [type]="config.type" [required]="config.required"
      >
      <mat-icon *ngIf="config.icon" matSuffix>{{ config.icon }}</mat-icon>
      <mat-icon matSuffix class="dgi-icon-edit" (click)="update(config)">edit</mat-icon>
      <mat-hint *ngIf="config.hint_start">{{ config.hint_start }}</mat-hint>
      <!--
      <mat-error *ngIf="mustShowErrors(config.name)">
        <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
      </mat-error> -->
  `,
  styleUrls: ['./form-email.component.scss'],
})
export class DgiFormEmailComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public onUpdate = new EventEmitter<any>();

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
  }

  public update(field: FieldConfig) {
    const dataReturn = { id: field.id, type: field.type };
    return this.onUpdate.emit(dataReturn);
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
