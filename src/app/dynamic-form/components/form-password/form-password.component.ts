import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormToolsService } from '../../../shared/form-tools.service';

@Component({
  selector: 'dgi-form-password',
  template: `
    <mat-form-field
      [ngClass]="getControlClass()"
      [formGroup]="group"
      [floatLabel]="['auto']"
      >
      <input [formControlName]="config.name"
        [required]="config.required" matInput [type]="config.type"
        [placeholder]="config.label">
        <mat-icon matSuffix (click)="hide = !hide">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>
        <!-- [type]="(hide ? 'password' : 'text')" -->
    </mat-form-field>
  `,
  styles: [
    `
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
export class FormPasswordComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  private hide = true;
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
