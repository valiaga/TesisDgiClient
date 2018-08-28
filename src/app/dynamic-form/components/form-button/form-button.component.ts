import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config';

@Component({
  selector: 'dgi-form-button',
  template: `
  <div
    class="dynamic-field form-button"
    [formGroup]="group">
    <button
      [disabled]="config.disabled"
      type="button">
      {{ config.label }}
    </button>
  </div>
  `,
  styles: [],
})
export class FormButtonComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
