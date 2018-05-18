import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LineaInvestigacion } from '../../shared/linea-investigacion';
import { LineaInvestigacionService } from '../../shared/linea-investigacion.service';
import { Escuela } from '../../../escuelas/shared/escuela';
import { Observable } from 'rxjs';
import { EscuelaService } from '../../../escuelas/shared/escuela.service';
import { MESSAGES } from '../../../../config/messages';

@Component({
  selector: 'dgi-create-linea-investigacion-dialog',
  templateUrl: './create-linea-investigacion-dialog.component.html',
  styles: [
    `
    .linea-investigacion-container {
      display: flex;
      flex-direction: column;
    }
    /*.linea-investigacion-container > * {
      width: 100%;
    }*/
    .linea-investigacion-container .checkbox{
      margin-bottom: 20px;
    }
  `
  ]
})
export class CreateLineaInvestigacionDialogComponent implements OnInit {
  private lineaInvestigacion: LineaInvestigacion;
  private createForm: FormGroup;
  private escuelas$: Observable<Escuela[]>;

  constructor(private dialogRef: MatDialogRef<CreateLineaInvestigacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    private lineaInvestigacionService: LineaInvestigacionService,
    private escuelaService: EscuelaService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.cargarMaestros();
    this.createNuevaLineaInvestigacion();
    this.buildForm();
  }

  cargarMaestros() {
    this.escuelas$ = this.escuelaService.getAllEscuelas$();
  }

  createNuevaLineaInvestigacion() {
    this.lineaInvestigacion = this.lineaInvestigacionService.getNuevaLineaInvestigacion();
  }

  buildForm() {
    const controls = this.initializeControls();
    this.createForm = this.formBuilder.group(controls);
  }

  onSubmit() {
    const lineaInvestigacion = this.createForm.value;
    const valid = this.createForm.valid;
    if (valid) {

      // Save here.
      this.lineaInvestigacionService.postLineaInvestigacion$(lineaInvestigacion)
        .subscribe(() => {
          this.snackBar.open(MESSAGES.lineaInvestigacion.post, MESSAGES.actions.post, {
            duration: 3000,
          });
        });
      this.dialogRef.close();
      this.createForm.reset();
    }
  }

  initializeControls() {
    const controls = {
      id: [this.lineaInvestigacion.id],
      nombre: [this.lineaInvestigacion.nombre, [Validators.required]],
      descripcion: [this.lineaInvestigacion.descripcion],
      activo: [this.lineaInvestigacion.activo],
      escuela: [this.lineaInvestigacion.escuela, [Validators.required]],
      fecha_creacion: [this.lineaInvestigacion.fecha_creacion],
      fecha_actualizacion: [this.lineaInvestigacion.fecha_actualizacion]
    };

    return controls;
  }
}
