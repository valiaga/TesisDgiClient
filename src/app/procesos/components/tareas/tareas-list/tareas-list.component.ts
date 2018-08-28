import { Component, OnInit } from '@angular/core';
import { TareaReactiveService } from '../../../../tareas/shared/tarea.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { TareaNewComponent } from '../tarea-new/tarea-new.component';
import { RequisitoReactiveService } from '../../../../requisitos/shared/requisitos.service';
import { Tarea } from '../../../../tareas/models/tarea';

@Component({
  selector: 'dgi-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.scss'],
})
export class TareasListComponent implements OnInit {
  public tareas$: Observable<Tarea[]>;
  public etapaId: string;

  constructor(
    private tareaReactiveService: TareaReactiveService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private requisitoReactiveService: RequisitoReactiveService,
  ) { }

  ngOnInit() {
    this.tareas$ = this.tareaReactiveService.tareas;

    this.loadMaestros();
  }

  public selectionChange(event: any) {
    const tareaId = event.selectedStep.content.elementRef.nativeElement.parentElement.id;
    this.requisitoReactiveService.getRequisitosByTareaId(tareaId);
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
