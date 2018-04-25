import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from '../../../../../config/general';
import { MESSAGES } from '../../../../../config/messages';
import { EtapaReactiveService } from '../../../../etapas/shared/etapa.service';
import { Etapa } from '../../../../etapas/shared/etapa';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dgi-etapa',
  templateUrl: './etapa-new.component.html',
  styleUrls: ['./etapa-new.component.scss']
})
export class EtapaNewComponent implements OnInit {
  public etapaForm: FormGroup;
  public etapas$: Observable<Etapa[]>;

  constructor(private dialogRef: MatDialogRef<EtapaNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private tdDialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
    private etapaReactiveService: EtapaReactiveService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.etapas$ = this.etapaReactiveService.etapas;
  }

  public buildForm() {
    const controls = this.initializeControls();
    this.etapaForm = this.formBuilder.group(controls);
  }

  public initializeControls() {
    const controls = {
      nombre: ['', [Validators.required]],
      descripcion: ['', []],
      proceso: [this.data.procesoId, [Validators.required]],
      anterior: ['', [Validators.required]],
      plazo_dias: [0, []],
      tarea_activador: ['', []],
      tarea_desactivador: ['', []],
      orden: ['', [Validators.required]],
    };

    return controls;
  }

  public onSubmit() {
    const valid = this.etapaForm.valid;
    const value = this.etapaForm.value;
    // console.log('save', value);
    if (valid) {
      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.etapa.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {

            this.etapaReactiveService.createEtapa(value);
            this.dialogRef.close();
            this.etapaForm.reset();
          } else {
          }
        });
    }
  }
}
