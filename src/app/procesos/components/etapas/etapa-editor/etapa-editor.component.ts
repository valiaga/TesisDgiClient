import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Etapa } from '../../../../etapas/shared/etapa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EtapaReactiveService } from '../../../../etapas/shared/etapa.service';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from '../../../../../config/general';
import { MESSAGES } from '../../../../../config/messages';

@Component({
  selector: 'dgi-etapa-editor',
  templateUrl: './etapa-editor.component.html',
  styleUrls: ['./etapa-editor.component.scss'],
})
export class EtapaEditorComponent implements OnInit {

  public nameEtapa = '';
  public idEtapa = '';

  @Input()
  set etapa(etapa: Etapa) {
    this.buildForm();
    this.patchEtapaForm(etapa);
  }

  // tslint:disable-next-line:no-input-rename
  public etapas$: Observable<Etapa[]>;

  public etapaEditorForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private etapaReactiveService: EtapaReactiveService,
    private viewContainerRef: ViewContainerRef,
    private tdDialogService: TdDialogService,
  ) { }

  ngOnInit() {
    this.etapas$ = this.etapaReactiveService.etapas;
  }

  public patchEtapaForm(etapa) {
    if (this.etapaEditorForm) {
      this.etapaEditorForm.patchValue({
        id: etapa.id,
        nombre: etapa.nombre,
        descripcion: etapa.descripcion,
        proceso: etapa.proceso,
        anterior: etapa.anterior,
        plazo_dias: etapa.plazo_dias,
        tarea_activador: etapa.tarea_activador,
        tarea_desactivador: etapa.tarea_desactivador,
        orden: etapa.orden,
      });

      this.nameEtapa = etapa.nombre;
      this.idEtapa = etapa.id;
    } else {
      // console.log('aun no esta lista');
      this.nameEtapa = '';
      this.idEtapa = '';
    }
  }

  public onSubmit() {
    const valid = this.etapaEditorForm.valid;
    const value = this.etapaEditorForm.value;
    if (valid) {
      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.etapa.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.etapaReactiveService.updateEtapa(value.id, value);
          } else {
          }
        });
    }
  }

  public eliminarEtapa() {
    const etapaId = this.etapaEditorForm.value.id;
    this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.etapa.confirmDelete, this.viewContainerRef))
      .afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.etapaReactiveService.remove(etapaId);
        } else {
        }
      });
  }

  public buildForm() {
    const controls = this.initializeControls();
    this.etapaEditorForm = this.formBuilder.group(controls);
  }

  public initializeControls() {
    const controls = {
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', []],
      proceso: ['', [Validators.required]],
      anterior: [''],
      plazo_dias: ['', []],
      tarea_activador: ['', []],
      tarea_desactivador: ['', []],
      orden: ['', [Validators.required]],
    };

    return controls;
  }
}
