import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FieldConfig } from '../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormToolsService } from '../../../shared/form-tools.service';

@Component({
  selector: 'dgi-form-number',
  template: `
  <!--[hideRequiredMarker]="[!config.required]" -->
  <mat-form-field
    [ngClass]="getControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']">

    <input
      matInput [placeholder]="config.label" [formControlName]="config.name"
      [id]="config.name" [type]="config.type" [required]="config.required"
      >

      <!-- <mat-error *ngIf="formTools.hasErrorsToShow(config.name)">-->
      <mat-error *ngIf="mustShowErrors(config.name)">
        <!-- <dgi-form-validator [hasError]="formTools.getErrors(config.name)"></dgi-form-validator>-->
        <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
      </mat-error>
  `,
  styles: [
    `
    .input-100 {
      width: 100%;
    }
    .input-50 {
      width: 49.5%;
    }
    .input-25 {
      width: 24.5%;
    }
    .input-20 {
      width: 24.5%;
    }
    .input-10 {
      width: 24.5%;
    }

    `
  ]
})
export class FormNumberComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  // formTools: FormTools;
  // private required = false;

  constructor(private formToolsService: FormToolsService) { }

  ngOnInit() {
    // this.formTools = new FormTools(this.group);
  }

  // ngOnChanges(changes: { [propKey: string]: SimpleChange}) {
  //   if (changes['form']) {
  //     this.formTools = new FormTools(this.group);
  //   }
  // }
  public getControlClass() {
    return this.formToolsService.getControlClass(this.config);
  }

  public mustShowErrors(controlName: string): boolean {
    return this.formToolsService.mustShowErrors(this.group, controlName);
  }

  public getControlErrors(controlName: string) {
    return this.formToolsService.getControlErrors(this.group, controlName);
  }

}
