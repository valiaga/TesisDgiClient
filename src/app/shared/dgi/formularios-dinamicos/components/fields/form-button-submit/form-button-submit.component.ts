import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';

@Component({
  selector: 'dgi-form-button-submit',
  template: `
  <!--<div
    class="dynamic-field form-button"
    [formGroup]="group">
    <button type="submit" [disabled]="!group.valid">
      {{ config.label }}
    </button>
  </div>-->
  <div [formGroup]="group">
    <!--<button mat-raised-button type="submit" [disabled]="!group.valid">{{ config.label }}</button>-->
    <button mat-button color="primary" type="submit" [disabled]="!group.valid">{{ config.label }}</button>
  </div>

  `,
  styles: [
    `
    /*
    button {
      letter-spacing: -0.5px;
      cursor: pointer;
      background-color: #9d62c8;
      outline: 0;
      line-height: 1;
      text-align: center;
      padding: 12px 30px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 2px;
      display: inline-block;
      border: none;
      color: #fff;
      transition: background-color .3s, box-shadow .3s;

      &:hover {
        background-color: #a46dcc;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
      }

      &:disabled {
        background: rgba(0, 0, 0, 0.2);
        color: rgba(0, 0, 0, 0.4);
        cursor: not-allowed;
        box-shadow: none;
      }
    }
    */
    `
  ]
})
export class DgiFormButtonSubmitComponent implements OnInit {

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
