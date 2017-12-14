import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


const ANGULAR_MODULES: any[] = [
  FormsModule, 
  ReactiveFormsModule,
  HttpClientModule,
];


@NgModule({
  imports: ANGULAR_MODULES,
  declarations: [],
  exports: ANGULAR_MODULES
})
export class AngularModule { }
