import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-form-slide-toggle',
  template: `
    <div [ngClass]="getWidthControlClass()"
      [formGroup]="group"
      class="slide-toggle-display">
      <mat-slide-toggle
        [color]="color"
        [required]="config.required"
        [formControlName]="config.name">
        {{config.label}}
        <!--
        <mat-error *ngIf="mustShowErrors(config.name)" class="msm-error">
          <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
        </mat-error>
        -->
      </mat-slide-toggle>
    </div>

  `,
  styleUrls: ['./form-slide-toggle.component.scss'],
})
export class DgiFormSlideToggleComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  public color = 'primary';
  // public checked = true;
  public disabled = false;

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
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
