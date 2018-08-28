import { Component, OnInit, EventEmitter } from '@angular/core';
import { FieldConfig } from '../../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-form-validador',
  template: `
  <!--[(indeterminate)]="indeterminate"-->
  <div [ngClass]="getWidthControlClass()"
    [formGroup]="group"
    class="validador-display"
    >
    <mat-checkbox
    class="validador-margin"
    [formControlName]="config.name"
    [labelPosition]="config.align"
    [required]="config.required">
    <!-- [align]="config.align" -->
    {{ config.label }}

    </mat-checkbox>
    <mat-hint *ngIf="config.hint_start">{{ config.hint_start }}</mat-hint>

    <!-- <mat-error *ngIf="mustShowErrors(config.name)" class="msm-error">
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error> -->
  </div>
  `,
  styleUrls: ['./form-validador.component.scss'],
})
export class DgiFormValidadorComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
  }

  public getWidthControlClass() {
    return this.formWidthToolsService.getWidthControlClass(this.config);
  }

}
