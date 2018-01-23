import { Component, OnInit } from '@angular/core';
import { FormToolsService } from '../../../shared/form-tools.service';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config';

@Component({
  selector: 'dgi-form-radio',
  template: `
  <div [formGroup]="group" [ngClass]="getControlClass()" class="radio-display">
    <label>{{ config.label }}: &nbsp;</label>
    <mat-radio-group [formControlName]="config.name" [required]="config.required"
     [ngClass]="{'radio-vertical': config.directionVertical}">
      <mat-radio-button *ngFor="let option of config.options" [value]="option.id">
        {{ option.label }} &nbsp;&nbsp;
      </mat-radio-button>
    </mat-radio-group>
    <mat-error *ngIf="mustShowErrors(config.name)" class="msm-error">
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error>
    <!-- <div>Mi sexo es {{group.controls[config.name].value}}</div> -->
  </div>
    `,
  styles: [
    `
    .radio-vertical {
      display: inline-flex;
      flex-direction: column;
    }
    .mat-radio-button {
      margin: 2px;
    }
    .msm-error {
      font-size: 75%;
    }
    .radio-display {
      display: inline-block;
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
    }`
  ]
})
export class FormRadioComponent implements OnInit {
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
