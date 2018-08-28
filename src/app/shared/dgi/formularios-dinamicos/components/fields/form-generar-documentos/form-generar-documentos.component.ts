import { Component, OnInit, EventEmitter } from '@angular/core';
import { FieldConfig } from '../../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-form-generar-documentos',
  template: `
<!--
  <div [ngClass]="getWidthControlClass()"
    [formGroup]="group"
    class="generar-documentos-display"
    >
    <mat-checkbox
    class="validador-margin"
    [formControlName]="config.name"
    [labelPosition]="config.align"
    [required]="config.required">
    {{ config.label }}
    </mat-checkbox>
    <mat-icon matSuffix class="dgi-icon-edit" (click)="update(config)">edit</mat-icon>
    <mat-hint *ngIf="config.hint_start">{{ config.hint_start }}</mat-hint>
  </div> -->

  <div
    class="generar-documentos-display"
    [ngClass]="getWidthControlClass()"
    [formGroup]="group">
    <button mat-raised-button color="accent" [title]="config.label"
      [disabled]="config.disabled"
      type="button">
      <mat-icon aria-label="config.hint_start">{{ config.icon }}</mat-icon>
      {{ config.label }}
    </button>
    <mat-icon matSuffix class="dgi-icon-edit" (click)="update(config)">edit</mat-icon>
    <br>
    <mat-hint *ngIf="config.hint_start">{{ config.hint_start }}</mat-hint>
  </div>
  `,
  styleUrls: ['./form-generar-documentos.component.scss'],
})
export class DgiFormGenerarDocumentosComponent implements OnInit {
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
