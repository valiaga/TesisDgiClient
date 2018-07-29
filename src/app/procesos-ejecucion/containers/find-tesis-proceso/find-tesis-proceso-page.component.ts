import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
// import { ProcesosService } from '../../../../procesos/shared/proceso.service';
import { MESSAGES } from 'config/messages';
import { snackBarDuration } from 'config/general';
import { MatSnackBar } from '@angular/material';
import { TesisProceso, TesisProcesoService } from '../../../tesis-procesos/shared';
import { ProcesosService } from '../../../procesos/shared/proceso.service';

@Component({
  selector: 'dgi-find-tesis-proceso-page',
  templateUrl: 'find-tesis-proceso-page.component.html',
  styles: [],
})
export class FindTesisProcesoPageComponent implements OnInit {
  // public tesisProcesos$: Observable<TesisProceso[]>;
  public tesisProcesos: TesisProceso[];
  private procesoId = null;

  constructor(
    private tesisProcesoService: TesisProcesoService,
    private procesosService: ProcesosService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(map(params => params.get('proceso_id')))
      .subscribe(procesoId => {
        console.log(procesoId);

        this.procesoId = procesoId;
        this.getTesisProcesos(this.procesoId.toString());
      });
  }

  public getTesisProcesos(proceso_id: string) {
    this.procesosService.getTesisProcesos$(proceso_id)
      .subscribe(this.loadTesisProcesos.bind(this));
  }
  private loadTesisProcesos(response) {
    this.tesisProcesos = response;
  }

  public onSave(data) {
    data.proceso = this.procesoId;
    this.tesisProcesoService.addTesisProcesoAndProyecto$(data)
      .subscribe(() => {
        this.snackBar.open(MESSAGES.tesisProceso.post, MESSAGES.actions.post, snackBarDuration);
        this.onRefreshLista();
      });
  }

  public onRefreshLista(event?) {
    this.getTesisProcesos(this.procesoId.toString());
  }

  public onDelete(event) {
    this.tesisProcesoService.delete$(event).subscribe(() => {
      this.snackBar.open(MESSAGES.tesisProceso.delete, MESSAGES.actions.delete, snackBarDuration);
      this.onRefreshLista();
    });
  }

}
