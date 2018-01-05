import { Component, OnInit, Input } from '@angular/core';
import { CampoBase } from '../models/campo-base';
import { FormGroup } from '@angular/forms';
import { ControlService } from '../shared/control.service';

@Component({
  selector: 'dgi-dynamic-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit()" [formGroup]="form">
    
        <div *ngFor="let campo of campos" class="form-row">
          <dgi-dynamic-form-campo [campo]="campo" [form]="form"></dgi-dynamic-form-campo>
        </div>
    
        <div class="form-row">
          <button type="submit" [disabled]="!form.valid">Save</button>
        </div>
      </form>

      <div *ngIf="cargaUtil" class="form-row">
        <strong>Saved the following values</strong><br>{{cargaUtil}}
      </div>
    </div>
  `,
  styles: [],
  providers: [
    ControlService
  ]
})
export class DynamicFormComponent implements OnInit {
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
  }

}
