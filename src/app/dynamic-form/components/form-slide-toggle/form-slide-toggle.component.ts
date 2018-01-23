import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormToolsService } from '../../../shared/form-tools.service';

@Component({
  selector: 'dgi-form-slide-toggle',
  template: `
  <!-- class="example-margin" -->
  <!-- [formControlName]="config.name" -->
  <!-- [checked]="checked" -->
  <!-- <mat-form-field
    [ngClass]="getControlClass()"
    [formGroup]="group"
    [floatLabel]="['auto']"
    > -->
    <div [ngClass]="getControlClass()"
      [formGroup]="group"
      class="slide-toggle-display">
      <mat-slide-toggle
        [color]="color"
        [required]="config.required"
        [formControlName]="config.name">
        {{config.label}}
        <mat-error *ngIf="mustShowErrors(config.name)" class="msm-error">
          <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
        </mat-error>
      </mat-slide-toggle>
    <!-- </mat-form-field> -->
    </div>

  `,
  styles: [
    `
    .msm-error {
      font-size: 75%;
    }
    .slide-toggle-display {
      display: inline-block;
    }
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
export class FormSlideToggleComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  private color = 'primary';
  // private checked = true;
  private disabled = false;

  constructor(private formToolsService: FormToolsService) { }

  ngOnInit() {
  }
  public getControlClass() {
    return this.formToolsService.getControlClass(this.config);
  }

  public mustShowErrors(controlName: string): boolean {
    return this.formToolsService.mustShowErrors(this.group, controlName);
  }

  public getControlErrors(controlName: string) {
    console.log('aquiiiiiiiiiiiiiiii');
    console.log(this.formToolsService.getControlErrors(this.group, controlName));
    return this.formToolsService.getControlErrors(this.group, controlName);
  }
}
