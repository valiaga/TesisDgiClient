import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';

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
export class DgiFormButtonComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public onUpdate = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public update(field: FieldConfig) {
    const dataReturn = { id: field.id, type: field.type };
    return this.onUpdate.emit(dataReturn);
  }
}
