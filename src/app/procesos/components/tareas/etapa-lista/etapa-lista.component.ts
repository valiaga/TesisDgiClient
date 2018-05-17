import { Component, OnInit } from '@angular/core';
import { EtapaReactiveService } from '../../../../etapas/shared/etapa.service';
import { Etapa } from '../../../../etapas/shared/etapa';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dgi-etapa-lista',
  templateUrl: './etapa-lista.component.html',
  styleUrls: ['./etapa-lista.component.scss']
})
export class EtapaListaComponent implements OnInit {
  public etapas$: Observable<Etapa[]>;

  constructor(
    private etapaReactiveService: EtapaReactiveService,
  ) { }

  ngOnInit() {
    this.etapas$ = this.etapaReactiveService.etapas;
  }

}
