import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-form-textarea',
  template: `
    <mat-form-field
      [ngClass]="getWidthControlClass()"
      [formGroup]="group"
      [floatLabel]="['auto']">
      <textarea matInput [placeholder]="config.label" [formControlName]="config.name"
            matTextareaAutosize [matAutosizeMinRows]="autosizeMinRows" [required]="config.required"
            [matAutosizeMaxRows]="autosizeMaxRows"></textarea>

      <!--
            <mat-error *ngIf="mustShowErrors(config.name)">
        <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
      </mat-error>
      -->
  </mat-form-field>

  `,
  styleUrls: ['./form-textarea.component.scss']
})
export class DgiFormTextareaComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  private autosizeMinRows = 2;
  private autosizeMaxRows = 5;

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
  }

  public getWidthControlClass() {
    return this.formWidthToolsService.getWidthControlClass(this.config);
  }

  // public mustShowErrors(controlName: string): boolean {
  //   return this.formToolsService.mustShowErrors(this.group, controlName);
  // }

  // public getControlErrors(controlName: string) {
  //   return this.formToolsService.getControlErrors(this.group, controlName);
  // }
}
