import { Component, OnInit } from '@angular/core';
import { FormToolsService } from '../../../shared/form-tools.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config';

@Component({
  selector: 'dgi-form-datepicker',
  template: `
  <!-- [style.width.px]="['50%']" -->
  <mat-form-field
    [ngClass]="getControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']"
      >
      <!---->
      <input matInput [id]="config.name" [matDatepicker]="picker" [type]="config.type"
        [placeholder]="config.label" [formControlName]="config.name" [required]="config.required">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>

      <mat-error *ngIf="mustShowErrors(config.name)">
        <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
      </mat-error>
    </mat-form-field>
  `,
  styleUrls: ['./form-datepicker.component.scss'],
})
export class FormDatepickerComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  date =  new FormControl(new Date());

  constructor(private formToolsService: FormToolsService) { }

  ngOnInit() {
  }

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
