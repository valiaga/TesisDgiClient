import { EventEmitter, Output, Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';
import { AbstractControl } from '@angular/forms';

@Component({
  exportAs: 'dgiDynamicForm',
  selector: 'dgi-dynamic-form',
  template: `
    <div>
    <!--(ngSubmit)="submitted.emit(form.value)"-->
      <form
        class="dynamic-form"
        [formGroup]="form"
        (submit)="handleSubmit($event)"
        >
        <ng-container
          *ngFor="let field of config"
          dgiDynamicField
          (onUpdate)="onUpdate($event)"
          [config]="field"
          [group]="form">
        </ng-container>
      </form>
<!--
      <form (ngSubmit)="onSubmit()" [formGroup]="form">

        <div *ngFor="let campo of campos" class="form-row">
          <dgi-dynamic-form-campo [campo]="campo" [form]="form"></dgi-dynamic-form-campo>
        </div>
        <div class="form-row">
          <button type="submit" [disabled]="!form.valid">Save</button>
        </div>
      </form>-->
<!--
      <div *ngIf="cargaUtil" class="form-row">
        <strong>Saved the following values</strong><br>{{cargaUtil}}
      </div> -->
    </div>
  `,
  styles: [
    `
    :host /deep/ .dynamic-field {
      margin-bottom: 15px;
      label {
        display: block;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0px;
        margin-bottom: 10px;
        color: rgba(0, 0, 0, 0.9);
      }
    }
    `
  ],
})
export class DgiDynamicFormComponent implements OnChanges, OnInit {
  @Input()
  public config: FieldConfig[] = [];

  @Output()
  public submit: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public update: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;

  get controls() { return this.config && this.config.filter(({ type }) => type !== 'buttonSubmit'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

  constructor(private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.createGroup();
  }

  public onUpdate(fieldId) {
    // console.log(fieldId);
    this.update.emit(fieldId);
  }

  public createGroup() {
    const group = this.formBuilder.group({});
    if (this.controls) {
      this.controls.forEach(control => {
        group.addControl(control.name, this.createControl(control));
      });
    }
    return group;
  }

  public createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.formBuilder.control({ disabled, value }, validation);
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls && this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });
    }
  }

  public handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  public setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config && this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  public setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }
}

