import { NgModule } from '@angular/core';
import { AddCommasPipe } from './add-commas.pipe';
// import { CommonModule } from '@angular/common';

export const PIPES = [ AddCommasPipe ];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class PipesModule { }
