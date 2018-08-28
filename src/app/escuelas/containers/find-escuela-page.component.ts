import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { EscuelaService } from '../shared/escuela.service';
import { Observable } from 'rxjs';
import { Escuela } from '../shared/escuela';
import { MatDialog } from '@angular/material';
import { CreateEscuelaDialogComponent } from './create-escuela-dialog/create-escuela-dialog.component';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from '../../../config/general';
import { MESSAGES } from '../../../config/messages';

@Component({
  selector: 'dgi-find-escuela-page',
  template: `
    <dgi-escuela-search></dgi-escuela-search>
    <dgi-escuela-list
      [escuelas] = "escuelas$ | async"
      (onDeleteEscuelaList) = "onDeleteEscuelaFind($event)"
      ></dgi-escuela-list>
    <dgi-button-fab (click)="openDialog()" [color]="['accent']" [icon]="['add']"></dgi-button-fab>
  `,
  styles: [],
})
export class FindEscuelaPageComponent implements OnInit {

  public escuelas$: Observable<Escuela[]>;

  constructor(private escuelaService: EscuelaService,
              private dialog: MatDialog,
              private viewContainerRef: ViewContainerRef,
              private tdDialogService: TdDialogService) { }

  ngOnInit() {
    // console.log("Estamos aqui!! ")
    this.escuelas$ = this.escuelaService.escuelas;
    this.escuelaService.loadAll();

  }

  onDeleteEscuelaFind(id: string) {
    // console.log('id delete==>>');
    // console.log(id);

    this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.escuela.confirmDelete, this.viewContainerRef))
    .afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.escuelaService.remove(id);
      } else {
      }
    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateEscuelaDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('close dialog escuela');
    });
  }
}
