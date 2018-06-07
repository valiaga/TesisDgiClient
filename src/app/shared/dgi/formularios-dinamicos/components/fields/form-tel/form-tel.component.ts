import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FieldConfig } from '../../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'dgi-form-tel',
  template: `
  <!-- [hideRequiredMarker]="[!config.required]" -->
  <mat-form-field
    [ngClass]="getWidthControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']">
    <span matPrefix>{{ codePostal }} &nbsp;</span>
    <input
      matInput [placeholder]="config.label" [formControlName]="config.name"
      [id]="config.name" [type]="config.type" [required]="config.required"
      >
    <mat-icon matSuffix>phone</mat-icon>
    <mat-icon matSuffix class="dgi-icon-edit" (click)="onEdit()">edit</mat-icon>
  <!--
    <mat-error *ngIf="mustShowErrors(config.name)">
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error>
    -->
  </mat-form-field>
  `,
  styleUrls: ['./form-tel.component.scss']
})
export class DgiFormTelComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  private codePostal = '+51';
  private edit: Subject<string> = new Subject<string>();

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
  }

  public onEdit() {
    this.edit.next();
  }

  public onUpdate(): Observable<any> {
    return this.edit.asObservable();
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
