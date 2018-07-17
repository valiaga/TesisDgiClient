import { Component, OnInit } from '@angular/core';
import { TesisProcesoService, TesisProceso } from '../../shared';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dgi-find-tesis-proceso-page',
  templateUrl: 'find-tesis-proceso-page.component.html',
  styles: [],
})
export class FindTesisProcesoPageComponent implements OnInit {
  public tesisProcesos$: Observable<TesisProceso[]>;
  private procesoId = null;

  constructor(
    private tesisProcesoService: TesisProcesoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.tesisProcesos$ = this.tesisProcesoService.tesisProcesos;

    // this.route.params.subscribe(params => {
    //   this.procesoId = params['proceso_id'];
    //   if (this.procesoId) {
    //     this.getTesisProcesos(this.procesoId.toString());
    //   } else {
    //     console.log('No hay parametros');
    //   }
    // });

    this.route.parent.paramMap
      .pipe(map(params => params.get('proceso_id')))
      .subscribe(procesoId => {
        this.procesoId = procesoId;
        console.log('procesoId: ', procesoId);
        this.getTesisProcesos(this.procesoId.toString());
      });
  }

  public getTesisProcesos(proceso_id: string) {
    this.tesisProcesoService.getTesisProcesosByProcesoId(proceso_id);
  }

  public onSave(data) {
    data.proceso = this.procesoId;
    this.tesisProcesoService.createTesisProcesoAndProyecto(data);
  }

}
