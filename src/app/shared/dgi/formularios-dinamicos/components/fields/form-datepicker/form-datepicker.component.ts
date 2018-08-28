import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-form-datepicker',
  template: `
  <!-- [style.width.px]="['50%']" -->
  <mat-form-field
    [ngClass]="getWidthControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']"
      >
      <!-- [type]="config.type" -->
      <input matInput [id]="config.name" [matDatepicker]="picker"
        [placeholder]="config.label" [formControlName]="config.name" [required]="config.required">
      <mat-hint *ngIf="config.hint_start">{{ config.hint_start }}</mat-hint>
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      <mat-icon matSuffix class="dgi-icon-edit" (click)="update(config)">edit</mat-icon>
<!--
      <mat-error *ngIf="mustShowErrors(config.name)">
        <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
      </mat-error> -->
    </mat-form-field>
  `,
  styleUrls: ['./form-datepicker.component.scss'],
})
export class DgiFormDatepickerComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public date = new FormControl(new Date());
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
}
