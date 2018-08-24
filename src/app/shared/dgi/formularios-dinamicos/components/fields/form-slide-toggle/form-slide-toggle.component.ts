import { Component, OnInit, EventEmitter } from '@angular/core';
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

  private color = 'primary';
  private disabled = false;
  public onUpdate = new EventEmitter<any>();

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
  }

  public update(field: FieldConfig) {
    const dataReturn = { id: field.id, type: field.type };
    return this.onUpdate.emit(dataReturn);
  }

  public getWidthControlClass() {
    return this.formWidthToolsService.getWidthControlClass(this.config);
  }

}
