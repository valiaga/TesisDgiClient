import { Proceso } from '../../procesos/modelos/proceso.model';
import { ProcesoService } from '../../procesos/shared/proceso.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dgi-seg-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss']
})
export class ProcesosComponent implements OnInit {
  public procesos$: Observable<Proceso[]>;

  constructor(private procesoService:ProcesoService) { }

  ngOnInit() {
    this.procesos$ = this.procesoService.getProcesos$().map(res => res.results);
  }
}
