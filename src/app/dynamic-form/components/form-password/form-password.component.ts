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
  styleUrls: ['./form-password.component.scss'],

})
export class FormPasswordComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  public hide = true;
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
