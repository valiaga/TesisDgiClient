import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'dgi-form-datepicker',
  template: `
  <!-- [style.width.px]="['50%']" -->
  <mat-form-field
    [ngClass]="getWidthControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']"
      >
      <input matInput [id]="config.name" [matDatepicker]="picker" [type]="config.type"
        [placeholder]="config.label" [formControlName]="config.name" [required]="config.required">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      <mat-icon matSuffix class="dgi-icon-edit" (click)="onEdit()">edit</mat-icon>
<!--
      <mat-error *ngIf="mustShowErrors(config.name)">
        <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
      </mat-error> -->
    </mat-form-field>
  `,
  styleUrls: ['./form-datepicker.component.scss']
})
export class DgiFormDatepickerComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public date = new FormControl(new Date());
  private edit: Subject<string> = new Subject<string>();

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
  }

  public onEdit() {
    this.edit.next();
  }

  public onUpdate(): Observable<any> {
    return this.edit.asObservable();
  }

  public getWidthControlClass() {
    return this.formWidthToolsService.getWidthControlClass(this.config);
  }
}
