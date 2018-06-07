import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'dgi-form-password',
  template: `
    <mat-form-field
      [ngClass]="getWidthControlClass()"
      [formGroup]="group"
      [floatLabel]="['auto']"
      >
      <input [formControlName]="config.name"
        [required]="config.required" matInput [type]="config.type"
        [placeholder]="config.label">
        <mat-icon matSuffix (click)="hide = !hide">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>
      <mat-icon matSuffix class="dgi-icon-edit" (click)="onEdit()">edit</mat-icon>
        <!-- [type]="(hide ? 'password' : 'text')" -->
    </mat-form-field>
  `,
  styleUrls: ['./form-password.component.scss']

})
export class DgiFormPasswordComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  private edit: Subject<string> = new Subject<string>();

  private hide = true;
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
