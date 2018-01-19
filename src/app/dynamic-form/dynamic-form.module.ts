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

const DYNAMIC_COMPONENTS: any[] = [
  DynamicFormCampoComponent,
  DynamicFormComponent,

  DynamicFieldDirective,
  FormButtonComponent,
  FormButtonSubmitComponent,
  FormInputComponent,
  FormNumberComponent,
  FormEmailComponent,
  FormSelectComponent,
  FormTelComponent,

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
    DynamicFormComponent
  ],
  entryComponents: [
    FormButtonComponent,
    FormButtonSubmitComponent,
    FormInputComponent,
    FormSelectComponent,
    FormEmailComponent,
    FormNumberComponent,
    FormTelComponent,
  ],
  providers: [
    FormToolsService,
  ]
})
export class DynamicFormModule { }
