import { OnChanges, Component, OnInit, SimpleChange, EventEmitter } from '@angular/core';
import { FieldConfig } from '../../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-form-email',
  template: `
  <!-- [hideRequiredMarker]="!config.required"-->
  <mat-form-field
    [ngClass]="getWidthControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']">

    <input
      matInput [placeholder]="config.label" [formControlName]="config.name"
      [id]="config.name" [type]="config.type" [required]="config.required"
      >
      <mat-icon matSuffix class="dgi-icon-edit" (click)="update(config.id)">edit</mat-icon>
      <mat-hint *ngIf="config.hint_start">{{ config.hint_start }}</mat-hint>
      <!--
      <mat-error *ngIf="mustShowErrors(config.name)">
        <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
      </mat-error> -->
  `,
  styleUrls: ['./form-email.component.scss']
})
export class DgiFormEmailComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public onUpdate = new EventEmitter<string>();

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
  }

  public update(fieldId: string) {
    return this.onUpdate.emit(fieldId);
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
