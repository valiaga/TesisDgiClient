import { TesisProceso } from '../shared/tesis-proceso';
import { TesisProcesoService } from '../shared/tesis-proceso.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateTesisProcesoDialogComponent } from '../containers/create-tesis-proceso-dialog.component';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'dgi-tesis-proceso-list',
  template: `
    <div class="card-container">
      <dgi-tesis-proceso *ngFor="let tesisProceso of tesisProcesos$ | async" [tesisProceso] = "tesisProceso">
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

  private tesisProcesos$: Observable<TesisProceso[]>;
  private procesoId = '';

  constructor(private route: ActivatedRoute,
    private tesisProcesoService: TesisProcesoService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.tesisProcesos$ = this.tesisProcesoService.tesisProcesos;
    /*
    this.route.params
      .switchMap((params: Params) => {
        return this.getProyectos(params['proceso_id'])
      })
      .subscribe(da => console.log(da));
      */

    this.route.params.subscribe(params => {
      this.procesoId = params['proceso_id'];
      if (this.procesoId) {
        this.getTesisProcesos(this.procesoId.toString());
      } else {
        console.log('No hay parametros');
      }
    });
  }

  getTesisProcesos(proceso_id: string) {
    this.tesisProcesoService.getTesisProcesosByProcesoId(proceso_id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTesisProcesoDialogComponent, {
      width: '500px',
      // data: {
      //   proyectoNombre: '...'
      // }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result && result.submit) {
        this.guardarTesisProceso(result.realData);
      } else {
        console.log('has cancel');
        console.log(result && result.realData);
      }
    });
  }

  guardarTesisProceso(data) {
    data.proceso = this.procesoId;
    this.tesisProcesoService.createTesisProcesoAndProyecto(data);
  }
}
