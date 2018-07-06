import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasService } from './shared/personas.service';

@NgModule({
  imports: [
    CommonModule,
    PersonasRoutingModule
  ],
  declarations: [],
  providers: [
    PersonasService,
  ]
})
export class PersonasModule { }
