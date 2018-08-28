import { Component, OnInit, EventEmitter } from '@angular/core';
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
      <mat-icon matSuffix class="dgi-icon-edit" (click)="update(config)">edit</mat-icon>

      <!--
            <mat-error *ngIf="mustShowErrors(config.name)">
        <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
      </mat-error>
      -->
  </mat-form-field>

  `,
  styleUrls: ['./form-textarea.component.scss'],
})
export class DgiFormTextareaComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public autosizeMinRows = 2;
  public autosizeMaxRows = 5;
  public onUpdate = new EventEmitter<any>();

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
  }

  public update(field: FieldConfig) {
    const dataReturn = { id: field.id, type: field.type };
    return this.onUpdate.emit(dataReturn);
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
