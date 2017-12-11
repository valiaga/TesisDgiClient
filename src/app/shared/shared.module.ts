// import { CoreModule } from '../core/core.module';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { AngularModule } from './angular/angular.module';
import { MaterialModule } from './material/material.module';
import { CovalentModule } from './covalent/covalent.module';

// import { FlexLayoutModule, } from '@angular/flex-layout';
// import { NgxChartsModule, } from '@swimlane/ngx-charts';

// const CHART_MODULES: any[] = [
//   NgxChartsModule,
// ];

@NgModule({
  imports: [
    // CommonModule,
    AngularModule,
    MaterialModule,
    CovalentModule
    // CHART_MODULES,
    // FLEX_LAYOUT_MODULES,
  ],
  declarations: [
    // AddCommasPipe
  ],
  exports:[
    AngularModule,
    MaterialModule,
    CovalentModule
    // CHART_MODULES,
    // FLEX_LAYOUT_MODULES,
  ]
})
export class SharedModule { }
