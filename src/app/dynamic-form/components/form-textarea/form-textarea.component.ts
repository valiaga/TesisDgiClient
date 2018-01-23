import { Component, OnInit } from '@angular/core';
import { FormToolsService } from '../../../shared/form-tools.service';
import { FieldConfig } from '../../models/field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dgi-form-textarea',
  template: `
    <mat-form-field
      [ngClass]="getControlClass()"
      [formGroup]="group"
      [floatLabel]="['auto']">
      <textarea matInput [placeholder]="config.label" [formControlName]="config.name"
            matTextareaAutosize [matAutosizeMinRows]="autosizeMinRows" [required]="config.required"
            [matAutosizeMaxRows]="autosizeMaxRows"></textarea>
      <mat-error *ngIf="mustShowErrors(config.name)">
        <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
      </mat-error>
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
export class FormTextareaComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  private autosizeMinRows = 2;
  private autosizeMaxRows = 5;

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
