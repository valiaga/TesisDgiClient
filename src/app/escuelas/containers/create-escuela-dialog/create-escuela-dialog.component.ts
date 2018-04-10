import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Escuela } from '../../shared/escuela';
import { EscuelaService } from '../../shared/escuela.service';
import { Facultad } from '../../../facultades/shared/facultad';
import { Observable } from 'rxjs/Observable';
import { FacultadService } from '../../../facultades/shared/facultad.service';
import { MESSAGES } from '../../../../config/messages';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from '../../../../config/general';

@Component({
  selector: 'dgi-create-escuela-dialog',
  templateUrl: './create-escuela-dialog.component.html',
  styles: [
    `
    .escuela-container {
      display: flex;
      flex-direction: column;
    }
    .escuela-container .checkbox{
      margin-bottom: 20px;
    }
    `
  ]
})
export class CreateEscuelaDialogComponent implements OnInit {
  private escuela: Escuela;
  private escuelaForm: FormGroup;
  private facultades$: Observable<Facultad[]>;

  private files: File | FileList;


  constructor(private dialogRef: MatDialogRef<CreateEscuelaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    private escuelaService: EscuelaService,
    private facultadService: FacultadService,
    private snackBar: MatSnackBar,
    private viewContainerRef: ViewContainerRef,
    private tdDialogService: TdDialogService
  ) { }

  ngOnInit() {
    this.cargarMaestros();
    this.createNuevaEscuela();
    this.buildForm();
  }

  cargarMaestros() {
    this.facultades$ = this.facultadService.getAllFacultades$();
  }

  createNuevaEscuela() {
    this.escuela = this.escuelaService.getNuevaEscuela();
  }

  buildForm() {
    const controls = this.initializeControls();
    this.escuelaForm = this.formBuilder.group(controls);
  }

  initializeControls() {
    const controls = {
      id: [this.escuela.id],
      nombre: [this.escuela.nombre, [Validators.required]],
      alias: [this.escuela.alias],
      activo: [this.escuela.activo],
      logo: [this.escuela.logo],
      mision: [this.escuela.mision],
      vision: [this.escuela.vision],
      facultad: [this.escuela.facultad, [Validators.required]],
      fecha_creacion: [this.escuela.fecha_creacion],
      fecha_actualizacion: [this.escuela.fecha_actualizacion]
    };
    return controls;
  }

  private prepareSave() {
    const input = new FormData();
    input.append('id', this.escuelaForm.get('id').value);
    input.append('nombre', this.escuelaForm.get('nombre').value);
    input.append('alias', this.escuelaForm.get('alias').value);
    input.append('activo', this.escuelaForm.get('activo').value);
    input.append('logo', this.escuelaForm.get('logo').value);
    input.append('mision', this.escuelaForm.get('mision').value);
    input.append('vision', this.escuelaForm.get('vision').value);
    input.append('facultad', this.escuelaForm.get('facultad').value);
    input.append('fecha_creacion', this.escuelaForm.get('fecha_creacion').value);
    input.append('fecha_actualizacion', this.escuelaForm.get('fecha_actualizacion').value);

    return input;
  }

  onSubmit() {
    const escuelaModel = this.prepareSave();

    const escuela = this.escuelaForm.value;
    const valid = this.escuelaForm.valid;
    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.escuela.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            // this.escuelaService.remove(id);
            this.escuelaService.create(escuelaModel);
            this.dialogRef.close();
            this.escuelaForm.reset();
          } else {
          }
        });


    }
  }

}
