import { Component, OnInit } from '@angular/core';
import { FormToolsService } from '../../../shared/form-tools.service';
import { FieldConfig } from '../../models/field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dgi-form-tel',
  template: `
  <mat-form-field
    [hideRequiredMarker]="[!config.required]"
    [formGroup]="group"
    [floatLabel]="['auto']">

    <input
      matInput [placeholder]="config.label" [formControlName]="config.name"
      [id]="config.name" [type]="config.type" required
      >

    <mat-error *ngIf="mustShowErrors(config.name)">
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error>
  </mat-form-field>
  `,
  styles: []
})
export class FormTelComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  constructor(private formToolsService: FormToolsService) {

  }

  ngOnInit() {
  }

  mustShowErrors(controlName: string): boolean {
    return this.formToolsService.mustShowErrors(this.group, controlName);
  }

  getControlErrors(controlName: string) {
    return this.formToolsService.getControlErrors(this.group, controlName);
  }
}
