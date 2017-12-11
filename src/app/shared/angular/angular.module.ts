import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule,
];


@NgModule({
  imports: ANGULAR_MODULES,
  declarations: [],
  exports: ANGULAR_MODULES
})
export class AngularModule { }
