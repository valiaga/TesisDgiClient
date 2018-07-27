import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateTesisProcesoDialogComponent } from '../../containers';
import { TesisProceso } from '../../../tesis-procesos/shared';


@Component({
  selector: 'dgi-tesis-proceso-list',
  template: `
    <div class="card-container">
      <dgi-tesis-proceso *ngFor="let tesisProceso of tesisProcesos" [tesisProceso] = "tesisProceso" (onRefresh)="onRefresh.emit($event)">
      </dgi-tesis-proceso>

      <dgi-button-fab (click)="openDialog()" [color]="['accent']" [icon]="['add']"></dgi-button-fab>
    </div>
      `,
  styles: [
    `
    .card-container{
      display: flex;
      flex-flow: row wrap;
    }
    `
  ]
})
export class TesisProcesoListComponent implements OnInit {

  @Input() tesisProcesos: TesisProceso[];
  @Output() onSave = new EventEmitter<any>();
  @Output() onRefresh = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
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
}
