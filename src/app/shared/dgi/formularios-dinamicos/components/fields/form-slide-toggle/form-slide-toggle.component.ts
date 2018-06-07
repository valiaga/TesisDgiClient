import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';
import { Subject, Observable } from 'rxjs';

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

}
