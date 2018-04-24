import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Etapa } from '../../../etapas/shared/etapa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EtapaReactiveService } from '../../../etapas/shared/etapa.service';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from '../../../../config/general';
import { MESSAGES } from '../../../../config/messages';
import { Tarea } from '../../../tareas/shared/tarea';
import { TareaReactiveService } from '../../../tareas/shared/tarea.service';
import { RolProcesoService } from '../../../rol-proceso/shared/rol-proceso.service';
import { RolProceso } from '../../../rol-proceso/shared/rol-proceso.model';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operator/map';
import { mergeMap } from 'rxjs/operator/mergeMap';


@Component({
  selector: 'dgi-tarea-editor',
  templateUrl: './tarea-editor.component.html',
  styleUrls: ['./tarea-editor.component.scss']
})
export class TareaEditorComponent implements OnInit {

  public nameTarea = '';
  public idTarea = '';
  public idRolEjecuta = '';

  @Input()
  set tarea(tarea: Tarea) {
    this.buildForm();
    this.patchTareaForm(tarea);
  }

  public tareas$: Observable<Tarea[]>;
  public rolesEjecuta$: Observable<RolProceso[]>;
  public tareaEditorForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private tareaReactiveService: TareaReactiveService,
    private viewContainerRef: ViewContainerRef,
    private tdDialogService: TdDialogService,
    private rolProcesoService: RolProcesoService,
  ) { }

  ngOnInit() {
    this.rolesEjecuta$ = this.rolProcesoService.rolProcesos
      .map(res => res.filter(ress => ress.activo === true));


    this.tareas$ = this.tareaReactiveService.tareas;
  }

  public patchTareaForm(tarea) {
    if (this.tareaEditorForm) {
      this.tareaEditorForm.patchValue({
        id: tarea.id,
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        etapa: tarea.etapa,
        anterior: tarea.anterior,
        rol_ejecuta: tarea.rol_ejecuta,
        plazo_dias: tarea.plazo_dias,
        req_res_activador: tarea.req_res_activador,
        req_res_desactivador: tarea.req_res_desactivador,
        orden: tarea.orden,
      });

      this.nameTarea = tarea.nombre;
      this.idTarea = tarea.id;
      this.idRolEjecuta = tarea.rol_ejecuta;
    } else {
      // console.log('aun no esta lista');
      this.nameTarea = '';
      this.idTarea = '';
      this.idRolEjecuta = '';
    }
  }

  public onSubmit() {
    const valid = this.tareaEditorForm.valid;
    const value = this.tareaEditorForm.value;
    if (valid) {
      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.tarea.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.tareaReactiveService.updateTarea(value.id, value);
          } else {
          }
        });
    }
  }

  public eliminarTarea() {
    const tareaId = this.tareaEditorForm.value.id;
    this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.tarea.confirmDelete, this.viewContainerRef))
      .afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.tareaReactiveService.remove(tareaId);
        } else {
        }
      });
  }

  public buildForm() {
    const controls = this.initializeControls();
    this.tareaEditorForm = this.formBuilder.group(controls);
  }

  public initializeControls() {
    const controls = {
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', []],
      etapa: ['', [Validators.required]],
      anterior: [''],
      rol_ejecuta: ['', [Validators.required]],
      plazo_dias: ['', [Validators.required]],
      req_res_activador: ['', []],
      req_res_desactivador: ['', []],
      orden: ['', [Validators.required]],
    };

    return controls;
  }
}
