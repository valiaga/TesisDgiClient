import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentExpansionPanelModule
} from '@covalent/core';


const COVALENT_MODULES = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentExpansionPanelModule
];

@NgModule({
  imports: COVALENT_MODULES,
  declarations: [],
  exports: COVALENT_MODULES,
})
export class CovalentModule { }
