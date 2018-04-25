import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../../../tareas/shared/tarea';
import { TareaReactiveService } from '../../../../tareas/shared/tarea.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { TareaNewComponent } from '../tarea-new/tarea-new.component';

@Component({
  selector: 'dgi-etapa-tareas',
  templateUrl: './etapa-tareas.component.html',
  styleUrls: ['./etapa-tareas.component.scss']
})
export class EtapaTareasComponent implements OnInit {
  public tareas$: Observable<Tarea[]>;
  public etapaId: string;

  constructor(
    private tareaReactiveService: TareaReactiveService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.tareas$ = this.tareaReactiveService.tareas;

    this.loadMaestros();
  }

  public loadMaestros() {
    this.route.params.subscribe(params => {
      const etapaId = params['etapaId'].toString(); // recuperación del parámetro
      this.etapaId = etapaId;
      this.tareaReactiveService.getTareasByEtapaId(etapaId);
    });
  }

  public newTarea() {
    const dialogRef = this.dialog.open(TareaNewComponent, {
      width: '500px',
      data: { etapaId: this.etapaId },
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('close dialog escuela');
    });
  }

}
