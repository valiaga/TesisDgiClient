import { EventEmitter, Output, Component, OnInit, Input, OnChanges } from '@angular/core';
import { CampoBase } from '../models/campo-base';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlService } from '../shared/control.service';
import { FieldConfig } from '../models/field-config';

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
          *ngFor="let field of config;"
          dgiDynamicField
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
  providers: [
    ControlService
  ]
})
export class DynamicFormComponent implements OnChanges, OnInit {
  /*
  @Input() campos: CampoBase<any>[] = [];
  form: FormGroup;
  cargaUtil = '';


  constructor(private controlService: ControlService) { }

  ngOnInit() {
    this.form = this.controlService.toFormGroup(this.campos)
  }

  onSubmit() {
    this.cargaUtil = JSON.stringify(this.form.value)
    console.log('cargaUtil=>');
    console.log(this.cargaUtil);
  }*/

  // Ultimo
  @Input()
  public config: FieldConfig[] = [];

  @Output()
  public submit: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;

  get controls() { return this.config.filter(({type}) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

  constructor(private formBuilder: FormBuilder) {}

  createGroup() {
    const group = this.formBuilder.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.formBuilder.control({disabled, value}, validation);
  }

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

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

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }
}

