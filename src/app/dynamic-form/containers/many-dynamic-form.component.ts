import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormToolsService } from '../../shared/form-tools.service';
import { Form } from '../models/form';

@Component({
  selector: 'dgi-many-dynamic-form',
  template: `
    <mat-card [ngClass]="getFormClass(formulario)" *ngFor="let formulario of formularios">
      <mat-card-header>
      <mat-card-title>{{ formulario.name }}</mat-card-title>
      <mat-card-subtitle> Formulario dinamico</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <dgi-dynamic-form
        [config]="formulario.fieldConfigs"
        #form = "dgiDynamicForm"
        (submit)="submit($event)"
          ></dgi-dynamic-form>
          {{ form.valid }}
          {{ form.value | json }}
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./many-dynamic-form.component.scss']
})
export class ManyDynamicFormComponent implements OnInit {

  @Input('formularios') formularios: any[];

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  constructor(private formToolsService: FormToolsService) { }

  ngOnInit() {
    setTimeout(() => {

      let previousValid = this.form.valid;
      this.form.changes.subscribe(() => {
        if (this.form.valid !== previousValid) {
          previousValid = this.form.valid;
          this.form.setDisabled('submit', !previousValid);
        }
      });

      this.form.setDisabled('submit', true);
      // this.form.setValue('name', 'Vitmar Aliaga');
      // this.form.setValue('edad', '15');
      // this.formTest = controls;
    }, 10000);
  }

  submit(value: { [name: string]: any }) {
    console.log('value');
    console.log(value);
  }

  public getFormClass(formulario: Form) {
    return this.formToolsService.getFormClass(formulario);
  }

}