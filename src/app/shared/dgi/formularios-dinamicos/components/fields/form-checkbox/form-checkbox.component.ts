import { Component, OnInit, EventEmitter } from '@angular/core';
import { FieldConfig } from '../../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-form-checkbox',
  template: `
  <!--[(indeterminate)]="indeterminate"-->
  <div [ngClass]="getWidthControlClass()"
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
    <!-- <mat-error *ngIf="mustShowErrors(config.name)" class="msm-error">
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error> -->
  </div>
  `,
  styleUrls: ['./form-checkbox.component.scss'],
})
export class DgiFormCheckboxComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public onUpdate = new EventEmitter<any>();

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
  }

  public getWidthControlClass() {
    return this.formWidthToolsService.getWidthControlClass(this.config);
  }

  public update(field: FieldConfig) {
    const dataReturn = { id: field.id, type: field.type };
    return this.onUpdate.emit(dataReturn);
  }
}
