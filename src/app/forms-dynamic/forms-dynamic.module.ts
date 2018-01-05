import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { FormsDynamicRoutingModule } from './forms-dynamic-routing.module';
import { DynamicFormCampoComponent } from './components/dynamic-form-campo.component';
import { DynamicFormComponent } from './components/dynamic-form.component';
import { AngularModule } from '../shared/angular/angular.module';
import { MaterialModule } from '../shared/material/material.module';

const DYNAMIC_COMPONENTS: any[] = [
  DynamicFormCampoComponent,
  DynamicFormComponent
]

@NgModule({
  imports: [
    AngularModule,
    MaterialModule,
    FormsDynamicRoutingModule
  ],
  declarations: DYNAMIC_COMPONENTS,
  exports: DYNAMIC_COMPONENTS
})
export class FormsDynamicModule { }
