import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../../tareas/shared/tarea';
import { TareaReactiveService } from '../../../tareas/shared/tarea.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dgi-etapa-tareas',
  templateUrl: './etapa-tareas.component.html',
  styleUrls: ['./etapa-tareas.component.scss']
})
export class EtapaTareasComponent implements OnInit {
  public tareas$: Observable<Tarea[]>;

  constructor(
    private tareaReactiveService: TareaReactiveService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.tareas$ = this.tareaReactiveService.tareas;

    this.loadMaestros();
  }

  public loadMaestros() {
    this.route.params.subscribe(params => {
      const etapaId = params['etapaId'].toString(); // recuperación del parámetro
      this.tareaReactiveService.getTareasByEtapaId(etapaId);
    });
  }

}
