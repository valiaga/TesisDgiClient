import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { TesisProcesoService, TesisProceso } from '../../shared';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from '../../../../config/general';
import { MESSAGES } from '../../../../config/messages';


@Component({
  selector: 'dgi-dialog-nuevo-proyecto',
  templateUrl: 'create-tesis-proceso-dialog.component.html',
  styles: [`
    .p-small {
      font-size: small;
      opacity: 0.8
    }
    .full-width {
      width: 100%;
    }
    `]
})
export class CreateTesisProcesoDialogComponent implements OnInit {

  private tesisProcesoForm: FormGroup;
  public tesisProceso: TesisProceso = new TesisProceso();
  public lengtMaxProyectoTitulo = 250;
  public lengtMinProyectoTitulo = 10;

  constructor(
    public dialogRef: MatDialogRef<CreateTesisProcesoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private tesisProcesoService: TesisProcesoService,
    private viewContainerRef: ViewContainerRef,
    private tdDialogService: TdDialogService,
  ) { }

  ngOnInit() {
    this.builForm();
  }

  onNoClick(): void {
    const data = {
      submit: false,
      realData: {}
    };
    this.dialogRef.close(data);
  }

  onSubmit(): void {
    const tesisProceso = this.tesisProcesoForm.value;
    const valid = this.tesisProcesoForm.valid;
    if (valid) {
      const data = {
        submit: true,
        realData: tesisProceso
      };

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.tesisProceso.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {

            this.dialogRef.close(data);
            this.tesisProcesoForm.reset();

          } else {
          }
        });

    }
  }

  initializeControls() {
    const controls = {
      proyecto_titulo: [
        this.tesisProceso.proyecto_titulo,
        [
          Validators.required,
          Validators.minLength(this.lengtMinProyectoTitulo),
          Validators.maxLength(this.lengtMaxProyectoTitulo)
        ]
      ],
      id: [],
      fecha_inicio: [],
      fecha_fin: [],
      estado: []
    };
    return controls;
  }

  builForm() {
    const controls = this.initializeControls();
    this.tesisProcesoForm = this.formBuilder.group(controls);
  }
}
