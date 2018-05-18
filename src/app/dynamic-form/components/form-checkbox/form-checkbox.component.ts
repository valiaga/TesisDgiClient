import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormToolsService } from '../../../shared/form-tools.service';

@Component({
  selector: 'dgi-form-checkbox',
  template: `
  <!--[(indeterminate)]="indeterminate"-->
  <div [ngClass]="getControlClass()"
    [formGroup]="group"
    class="checkbox-display"
    >
    <mat-checkbox
    class="checkbox-margin"
    [formControlName]="config.name"
    [labelPosition]="config.align"
    [required]="config.required">
    <!-- [align]="config.align" -->
    {{ config.label }}

    </mat-checkbox>
    <mat-error *ngIf="mustShowErrors(config.name)" class="msm-error">
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error>
  </div>
  `,
  styleUrls: ['./form-checkbox.component.scss']
})
export class FormCheckboxComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

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
