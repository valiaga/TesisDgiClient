import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import {
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule,
  MatDialogModule, MatProgressSpinnerModule, 
  MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
  MatStepperModule
  //, MdCoreModule
} from '@angular/material';

const MATERIAL_MODULES: any[] = [
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule,
  MatDialogModule, MatProgressSpinnerModule, MatTableModule,
  MatPaginatorModule, MatSortModule, MatFormFieldModule,
  MatStepperModule
  // ,MdCoreModule
];


@NgModule({
  imports: MATERIAL_MODULES,
  declarations: [],
  exports: MATERIAL_MODULES
})
export class MaterialModule { }
