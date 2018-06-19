import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { AsesoresService, AsesoresReactiveService } from '../../shared/asesores.service';

@Component({
  selector: 'dgi-form-new',
  templateUrl: './form-new.component.html',
  styleUrls: ['./form-new.component.scss'],
})
export class FormNewComponent implements OnInit {
  public asesorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormNewComponent>,
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private tdDialogService: TdDialogService,
    private asesoresReactiveService: AsesoresReactiveService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.asesorForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      id: [''],
      activo: [true, Validators.required],
      persona: this.formBuilder.group({
        id: [''],
        nombres: ['', Validators.required],
        apellido_paterno: ['', Validators.required],
        apellido_materno: ['', Validators.required],
        genero: ['M', Validators.required],
        // fecha_nacimiento: [(new Date()).toISOString(), Validators.required],
        fecha_nacimiento: ['', Validators.required],
      })
    };

    return controls;
  }

  private prepareFechaNacimiento(fecha_nacimiento) {
    return fecha_nacimiento && fecha_nacimiento.toISOString().split('T')[0];
  }

  public onSubmit() {
    const value = this.asesorForm.value;
    const valid = this.asesorForm.valid;
    // console.log(this.prepareFechaNacimiento(value.fecha_nacimiento));

    value.persona.fecha_nacimiento = this.prepareFechaNacimiento(value.persona.fecha_nacimiento);

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.asesor.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.asesoresReactiveService.save(value);
            this.dialogRef.close();
            this.asesorForm.reset();
          } else {
          }
        });
    }
  }

}
