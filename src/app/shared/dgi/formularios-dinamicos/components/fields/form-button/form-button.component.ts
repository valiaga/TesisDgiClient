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
  styles: []
})
export class DgiFormButtonComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public onUpdate = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public update(fieldId: string) {
    return this.onUpdate.emit(fieldId);
  }
}
