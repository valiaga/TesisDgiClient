import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'dgi-form-radio',
  template: `
  <div [formGroup]="group" [ngClass]="getWidthControlClass()" class="radio-display">
    <label>{{ config.label }}: &nbsp;</label>
    <mat-radio-group [formControlName]="config.name" [required]="config.required"
     [ngClass]="{'radio-vertical': config.directionVertical}">
      <mat-radio-button *ngFor="let option of config.options" [value]="option.id">
        {{ option.label }} &nbsp;&nbsp;
      </mat-radio-button>
    </mat-radio-group>
    <!--
    <mat-error *ngIf="mustShowErrors(config.name)" class="msm-error">
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error>
    -->
  </div>
    `,
  styleUrls: ['./form-radio.component.scss']
})
export class DgiFormRadioComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  private edit: Subject<string> = new Subject<string>();

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
  }

  public getWidthControlClass() {
    return this.formWidthToolsService.getWidthControlClass(this.config);
  }

  public onEdit() {
    this.edit.next();
  }

  public onUpdate(): Observable<any> {
    return this.edit.asObservable();
  }
}
