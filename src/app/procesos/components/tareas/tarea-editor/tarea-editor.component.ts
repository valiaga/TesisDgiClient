import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from '../../../../../config/general';
import { MESSAGES } from '../../../../../config/messages';
import { TareaReactiveService } from '../../../../tareas/shared/tarea.service';
import { RolProcesoService, RolProcesoReactiveService } from '../../../../rol-proceso/shared/rol-proceso.service';
import { RolProceso } from '../../../../rol-proceso/shared/rol-proceso.model';
import { mergeMap, map, filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Requisito } from '../../../../requisitos/shared/requisito';
import { RequisitoReactiveService } from '../../../../requisitos/shared/requisitos.service';
import { MatDialog } from '@angular/material';
import { RequisitoNewComponent } from '../../requisitos/requisito-new/requisito-new.component';
import { Tarea } from '../../../../tareas/models/tarea';

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
  public requisitos$: Observable<Requisito[]>;
  public rolesEjecuta$: Observable<RolProceso[]>;
  public tareaEditorForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private tareaReactiveService: TareaReactiveService,
    private viewContainerRef: ViewContainerRef,
    private tdDialogService: TdDialogService,
    private route: ActivatedRoute,
    private router: Router,
    // private rolProcesoService: RolProcesoService,
    private rolProcesoReactiveService: RolProcesoReactiveService,
    private requisitoReactiveService: RequisitoReactiveService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.rolesEjecuta$ = this.rolProcesoReactiveService.rolProcesos
      .pipe(
        map(res => res.filter(ress => ress.activo === true))
      );


    this.tareas$ = this.tareaReactiveService.tareas;
    this.requisitos$ = this.requisitoReactiveService.requisitos;

    this.loadMaestros();
  }

  public loadMaestros() {
    this.route.params.subscribe(params => {
      const procesoId = params['id'].toString();
      this.rolProcesoReactiveService.getWithQuery({ proceso_id: procesoId });
    });
  }

  public VerFormulariosDinamicos() {
    // this.router.navigate(['../']);
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

  public newRequisito() {
    const tareaId = this.tareaEditorForm.value.id;
    const dialogRef = this.dialog.open(RequisitoNewComponent, {
      width: '500px',
      data: { tareaId: tareaId },
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('close dialog escuela');
    });
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
