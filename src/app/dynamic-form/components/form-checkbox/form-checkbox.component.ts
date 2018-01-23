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
    [align]="config.align"
    [required]="config.required">
    {{ config.label }}

    </mat-checkbox>
    <mat-error *ngIf="mustShowErrors(config.name)" class="msm-error">
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error>
  </div>
  `,
  styles: [
    `
    .checkbox-display {
      display: inline-block;
    }
    .msm-error {
      font-size: 75%;
    }

    .input-100 {
      width: 100%;
    }
    .input-50 {
      width: 49.5%;
    }
    .input-25 {
      width: 24.5%;
    }
    .input-20 {
      width: 24.5%;
    }
    .input-10 {
      width: 24.5%;
    }

    `
  ]
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
