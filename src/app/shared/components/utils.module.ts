import { NgModule } from '@angular/core';
import { ButtonFabComponent } from './button-fab.component';
import { MaterialModule } from '../material/material.module';
// import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    // CommonModule,
    MaterialModule,
  ],
  declarations: [
    ButtonFabComponent,
  ],
  exports: [
    ButtonFabComponent,
  ],
})
export class UtilsModule { }
