import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DgiDynamicFormComponent } from './../dynamic-form/dynamic-form.component';
import { Formulario } from '../../../models';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-many-dynamic-form',
  template: `
    <mat-card *ngFor="let formulario of formularios" [ngClass]="getWidthFormClass(formulario)">
      <mat-card-header>
      <mat-card-title>{{ formulario.nombre }}</mat-card-title>
      <mat-card-subtitle> {{ formulario.descripcion }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <dgi-dynamic-form
          [config]="formulario.campos"
          #form = "dgiDynamicForm"
          (submit)="submit($event)"
          (update)="update($event)"
          ></dgi-dynamic-form>

          {{ form.valid }}
          {{ form.value | json }}
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./many-dynamic-form.component.scss']
})
export class DgiManyDynamicFormComponent implements OnInit {

  @Input() formularios: Formulario[];
  // @Input('formularios') formularios: Formulario[];

  @ViewChild(DgiDynamicFormComponent) form: DgiDynamicFormComponent;

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {
    setTimeout(() => {

      // let previousValid = this.form && this.form.valid;
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
    }, 2000);
  }

  public submit(value: { [name: string]: any }) {
    console.log('value');
    console.log(value);
  }

  public update(fieldId: string) {
    // console.log('fieldId: ', fieldId);
  }

  public getWidthFormClass(formulario: Formulario) {
    return this.formWidthToolsService.getWidthFormClass(formulario);
  }

}
