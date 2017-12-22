import { Component, OnInit } from '@angular/core';
import { EscuelaService } from '../shared/escuela.service';
import { Observable } from 'rxjs/Observable';
import { Escuela } from '../shared/escuela';
import { MatDialog } from '@angular/material';
import { CreateEscuelaDialogComponent } from './create-escuela-dialog/create-escuela-dialog.component';

@Component({
  selector: 'dgi-find-escuela-page',
  template: `
    <dgi-escuela-search></dgi-escuela-search>
    <dgi-escuela-list
      [escuelas] = "escuelas$ | async"
      ></dgi-escuela-list>
    <dgi-button-fab (click)="openDialog()" [color]="['accent']" [icon]="['add']"></dgi-button-fab>
  `,
  styles: []
})
export class FindEscuelaPageComponent implements OnInit {

  private escuelas$: Observable<Escuela[]>;

  constructor(private escuelaService: EscuelaService,
              private dialog: MatDialog) { }

  ngOnInit() {
    console.log("Estamos aqui!! ")
    this.escuelas$ = this.escuelaService.escuelas;
    this.escuelaService.loadAll();

  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateEscuelaDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('close dialog escuela')
    });
  }
}
