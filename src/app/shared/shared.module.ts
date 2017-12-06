import { CoreModule } from '../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { FlexLayoutModule, } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import {
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentExpansionPanelModule
} from '@covalent/core';

import {
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule,
  MatDialogModule 
  // MdCoreModule
} from '@angular/material';

// import { NgxChartsModule, } from '@swimlane/ngx-charts';

const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule,
];

const MATERIAL_MODULES: any[] = [
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule,
  MatDialogModule
  // MdCoreModule
];

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentExpansionPanelModule
];

// const CHART_MODULES: any[] = [
//   NgxChartsModule,
// ];

@NgModule({
  imports: [
    CommonModule,

    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    // CHART_MODULES,
    // FLEX_LAYOUT_MODULES,
  ],
  declarations: [],
  exports:[
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    // CHART_MODULES,
    // FLEX_LAYOUT_MODULES,
    
  ]
})
export class SharedModule { }
