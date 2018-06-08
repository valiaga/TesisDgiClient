import { Component, OnInit, Input, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { DgiDynamicFormComponent } from './../dynamic-form/dynamic-form.component';
import { Formulario } from '../../../models';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-many-dynamic-form',
  templateUrl: 'many-dynamic-form.component.html',
  styleUrls: ['./many-dynamic-form.component.scss']
})
export class DgiManyDynamicFormComponent implements OnInit, AfterViewChecked {

  // @Input('formularios') formularios: Formulario[];
  @Input() formularios: Formulario[];

  @ViewChild(DgiDynamicFormComponent) form: DgiDynamicFormComponent;

  constructor(private formWidthToolsService: FormWidthToolsService,
    private changeDetector: ChangeDetectorRef) { }

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

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  public getWidthFormClass(formulario: Formulario) {
    return this.formWidthToolsService.getWidthFormClass(formulario);
  }

}
