import { OnChanges, Component, OnInit, SimpleChange } from '@angular/core';
import { FieldConfig } from '../../models/field-config';
import { FormGroup } from '@angular/forms';
import { FormToolsService } from '../../../shared/form-tools.service';

@Component({
  selector: 'dgi-form-email',
  template: `
  <mat-form-field
    [hideRequiredMarker]="!config.required"
    [formGroup]="group"
    [floatLabel]="['auto']">

    <input
      matInput [placeholder]="config.label" [formControlName]="config.name"
      [id]="config.name" [type]="config.type" required
      >

    <mat-error *ngIf="mustShowErrors(config.name)">
      <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator>
    </mat-error>
  </mat-form-field>
  `,
  styles: []
})
export class FormEmailComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  // formTools: FormTools;
  // private required = false;

  constructor(private formToolsService: FormToolsService) { }

  ngOnInit() {
    // this.formTools = new FormTools(this.group);
    // this.required = this.formTools.getErrors(this.config.name) &&
    // !this.formTools.getErrors(this.config.name).required;
  }

  // ngOnChanges(changes: { [propKey: string]: SimpleChange}) {
  //   if (changes['form']) {
  //     this.formTools = new FormTools(this.group);
  //   }
  // }

  mustShowErrors(controlName: string): boolean {
    return this.formToolsService.mustShowErrors(this.group, controlName);
  }

  getControlErrors(controlName: string) {
    return this.formToolsService.getControlErrors(this.group, controlName);
  }

}
