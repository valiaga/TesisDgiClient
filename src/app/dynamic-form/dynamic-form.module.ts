import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { DynamicFormCampoComponent } from './components/dynamic-form-campo.component';
import { DynamicFormComponent } from './containers/dynamic-form.component';
import { AngularModule } from '../shared/angular/angular.module';
import { MaterialModule } from '../shared/material/material.module';

import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormButtonSubmitComponent } from './components/form-button-submit/form-button-submit.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { FormValidatorComponent } from './components/form-validator.component';
import { FormEmailComponent } from './components/form-email/form-email.component';
import { FormNumberComponent } from './components/form-number/form-number.component';
// import { FormToolsService } from '../shared/form-tools.service';
import { FormTelComponent } from './components/form-tel/form-tel.component';
import { FormToolsService } from '../shared/form-tools.service';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormSlideToggleComponent } from './components/form-slide-toggle/form-slide-toggle.component';
import { FormPasswordComponent } from './components/form-password/form-password.component';
import { FormDatepickerComponent } from './components/form-datepicker/form-datepicker.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { ManyDynamicFormComponent } from './containers/many-dynamic-form.component';

const DYNAMIC_COMPONENTS: any[] = [
  // DynamicFormCampoComponent,

  /** Components containers */
  DynamicFormComponent,
  ManyDynamicFormComponent,

  /** Components form */
  DynamicFieldDirective,
  FormButtonComponent,
  FormButtonSubmitComponent,
  FormInputComponent,
  FormNumberComponent,
  FormEmailComponent,
  FormSelectComponent,
  FormTelComponent,
  FormTextareaComponent,
  FormSlideToggleComponent,
  FormPasswordComponent,
  FormDatepickerComponent,
  FormRadioComponent,
  FormCheckboxComponent,

  FormValidatorComponent,
];

@NgModule({
  imports: [
    AngularModule,
    MaterialModule,
    // DynamicFormRoutingModule
  ],
  declarations: DYNAMIC_COMPONENTS,
  exports: [
    DynamicFormComponent,
    ManyDynamicFormComponent,
  ],
  entryComponents: [
    FormButtonComponent,
    FormButtonSubmitComponent,
    FormInputComponent,
    FormSelectComponent,
    FormEmailComponent,
    FormNumberComponent,
    FormTelComponent,
    FormTextareaComponent,
    FormSlideToggleComponent,
    FormPasswordComponent,
    FormDatepickerComponent,
    FormRadioComponent,
    FormCheckboxComponent,

  ],
  providers: [
    FormToolsService,
  ]
})
export class DynamicFormModule { }
