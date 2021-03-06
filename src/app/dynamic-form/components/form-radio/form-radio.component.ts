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
  styleUrls: ['./form-radio.component.scss'],
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
