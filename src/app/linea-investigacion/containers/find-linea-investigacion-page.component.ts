import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateLineaInvestigacionDialogComponent } from './create-linea-investigacion-dialog/create-linea-investigacion-dialog.component';

@Component({
  selector: 'dgi-find-linea-investigacion-page',
  template: `
    <dgi-linea-investigacion-search></dgi-linea-investigacion-search>
    <dgi-linea-investigacion-list></dgi-linea-investigacion-list>
    <dgi-button-fab (click)="openDialog()" [color]="['accent']" [icon]="['add']"></dgi-button-fab>
  `,
  styles: [
    `
    `
  ]
})
export class FindLineaInvestigacionPageComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){
    let dialogRef = this.dialog.open(CreateLineaInvestigacionDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('close')
    });
  }
}
