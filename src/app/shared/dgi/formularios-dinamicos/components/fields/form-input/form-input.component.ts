import { Component, SimpleChange, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'dgi-form-input',
  template: `
  <!--[hideRequiredMarker]="[!config.required]"-->
  <mat-form-field
    [ngClass]="getWidthControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']">
    <input
      matInput [placeholder]="config.label" [formControlName]="config.name"
      [id]="config.name" [type]="config.type" [required]="config.required"
      >
      <mat-icon matSuffix class="dgi-icon-edit" (click)="onEdit()">edit</mat-icon>
    <!--
    <mat-error *ngIf="mustShowErrors(config.name)">
    <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error> -->
  </mat-form-field>
  `,
  styleUrls: ['./form-input.component.scss']
})
export class DgiFormInputComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  private edit: Subject<string> = new Subject<string>();

  constructor(private formWidthToolsService: FormWidthToolsService) {
  }

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

