import { Component, OnInit, Input, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateTesisProcesoDialogComponent } from '../../containers';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { FormAddTesistaComponent } from '../form-add-tesista/form-add-tesista.component';
import { TesisProceso } from '../../../tesis-procesos/shared';

@Component({
  selector: 'dgi-tesis-proceso-list',
  templateUrl: 'tesis-proceso-list.component.html',
  styleUrls: ['tesis-proceso-list.component.scss'],
})
export class TesisProcesoListComponent implements OnInit {

  @Input() tesisProcesos: TesisProceso[];
  @Output() onSave = new EventEmitter<any>();
  @Output() onRefreshLista = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<string>();

  constructor(
    // private tesisProcesoReactiveService: TesisProcesoReactiveService,
    private tdDialogService: TdDialogService,
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateTesisProcesoDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.submit) {
        this.onSave.emit(result.realData);
      } else {
        console.log('has cancel');
        console.log(result && result.realData);
      }
    });
  }

  public deleteTesisProceso(tesisProcesoId: string) {

    this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.tesisProceso.confirmDelete, this.viewContainerRef))
      .afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.onDelete.emit(tesisProcesoId);
          // this.tesisProcesoReactiveService.delete(tesisProcesoId);
        } else {
        }
      });
  }

  public addTesista(proyecto) {
    const dialogRef = this.dialog.open(FormAddTesistaComponent, {
      width: '500px',
      data: {
        proyecto: proyecto,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onRefreshLista.emit();
        // this.getPerfiles();
      }
    });
  }
}
