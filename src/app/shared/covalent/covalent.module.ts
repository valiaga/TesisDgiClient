import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {
  // CovalentDataTableModule, CovalentLoadingModule,
  // CovalentPagingModule, CovalentStepsModule,
  // CovalentCommonModule,
  CovalentExpansionPanelModule,
  CovalentStepsModule,
  CovalentDialogsModule,
  CovalentFileModule, CovalentNotificationsModule, CovalentSearchModule,
  CovalentMenuModule, CovalentLayoutModule, CovalentMediaModule,
} from '@covalent/core';


const COVALENT_MODULES = [
  // CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  // CovalentLayoutModule, CovalentMenuModule,
  // CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  // CovalentCommonModule,
  CovalentExpansionPanelModule,
  CovalentStepsModule,


  CovalentDialogsModule,
  CovalentNotificationsModule, CovalentFileModule, CovalentSearchModule,
  CovalentMenuModule, CovalentLayoutModule, CovalentMediaModule,
];

@NgModule({
  imports: COVALENT_MODULES,
  declarations: [],
  exports: COVALENT_MODULES,
})
export class CovalentModule { }
