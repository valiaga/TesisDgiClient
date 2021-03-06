import { ActivatedRoute } from '@angular/router';
// import { ProcesoService } from '../shared/proceso.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { TdDialogService } from '@covalent/core';
import { Proceso } from '../models/proceso.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { RolProcesoComponent } from '../components/rol-proceso/rol-proceso.component';
import { getMessageConfirm } from '../../../config/general';
import { MESSAGES } from '../../../config/messages';
import { EtapaNewComponent } from '../components/etapas/etapa-new/etapa-new.component';
import { EtapaReactiveService } from '../../etapas/shared/etapa.service';
import { Etapa } from '../../etapas/shared/etapa';
import { RolProceso } from '../../rol-proceso/shared/rol-proceso.model';
import { RolProcesoReactiveService } from '../../rol-proceso/shared/rol-proceso.service';
import { ProcesosReactiveService, ProcesosService } from '../shared/proceso.service';

@Component({
  selector: 'dgi-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  public procesoForm: FormGroup;
  public proceso: Proceso;
  public rolProcesos$: Observable<RolProceso[]>;
  public etapas$: Observable<Etapa[]>;

  public panelOpenState = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private procesosReactiveService: ProcesosReactiveService,
    private procesosService: ProcesosService,
    private tdDialogService: TdDialogService,
    private rolProcesoReactiveService: RolProcesoReactiveService,
    private etapaReactiveService: EtapaReactiveService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.rolProcesos$ = this.rolProcesoReactiveService.rolProcesos;
    this.etapas$ = this.etapaReactiveService.etapas;
    // subscripción al observable params
    this.route.params.subscribe(params => {
      const procesoId = params['id'].toString(); // recpeción del parámetro
      this.getProceso(procesoId);
      this.loadMaters(procesoId);
    });

    this.createNewProceso();
    this.buildForm();

  }

  public onChangeActivoRolProceso(event: any, id: string) {
    this.rolProcesoReactiveService.patch(id, { activo: event.checked });
  }

  public onDeleteRolProceso(rolProcesosId: string) {
    this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.rolProceso.confirmDelete, this.viewContainerRef))
      .afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.rolProcesoReactiveService.delete(rolProcesosId);
        } else {
        }
      });
  }

  public loadMaters(procesoId) {
    this.rolProcesoReactiveService.getWithQuery({ proceso_id: procesoId });
    this.etapaReactiveService.getEtapasByProcesoId(procesoId);
  }

  public newRolProceso() {
    const procesoId = this.procesoForm.get('id').value;

    const dialogRef = this.dialog.open(RolProcesoComponent, {
      width: '500px',
      data: { procesoId: procesoId },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('close dialog escuela');
    });
  }

  public newEtapa() {
    const procesoId = this.procesoForm.get('id').value;
    const dialogRef = this.dialog.open(EtapaNewComponent, {
      width: '500px',
      data: { procesoId: procesoId },
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('close dialog escuela');
    });
  }

  public getProceso(procesoId: string) {
    this.procesosService.getById$(procesoId)
      .subscribe(this.patchProceso.bind(this));
  }

  public onSubmit() {
    const valid = this.procesoForm.valid;
    const value = this.procesoForm.value;
    if (valid) {
      this.procesosReactiveService.update(value);
    }
  }

  public patchProceso(response) {
    // console.log(response);
    this.procesoForm.patchValue({
      id: response.id,
      nombre: response.nombre,
      descripcion: response.descripcion,
      activo: response.activo,
    });
  }

  public createNewProceso() {
    this.proceso = new Proceso('', '', false, '', '', '');
  }

  public buildForm() {
    const controls = this.initializeControls();
    this.procesoForm = this.formBuilder.group(controls);
  }

  public initializeControls() {
    const controls = {
      id: [this.proceso.id],
      nombre: [this.proceso.nombre, [Validators.required]],
      descripcion: [this.proceso.descripcion],
      activo: [this.proceso.activo],
    };

    return controls;
  }

  toggleRequiredStep2(): void {
    // this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
  }
  activeStep1Event(): void {
    // this.activeDeactiveStep1Msg = 'Active event emitted.';
  }

}
