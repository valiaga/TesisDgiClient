import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AsesoresService, AsesoresReactiveService } from '../../shared/asesores.service';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';

@Component({
  selector: 'dgi-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {
  public asesorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    private asesoresService: AsesoresService,
    private tdDialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
    private asesoresReactiveService: AsesoresReactiveService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.patchForm();
  }

  public patchForm() {
    this.asesoresService.getById$(this.data.asesorId)
      .subscribe(this.patchToForm.bind(this));
  }

  private patchToForm(response) {
    this.asesorForm.patchValue({
      id: response.id,
      activo: response.activo,
      persona: {
        id: response.data_persona.id,
        nombres: response.data_persona.nombres,
        apellido_paterno: response.data_persona.apellido_paterno,
        apellido_materno: response.data_persona.apellido_materno,
        num_doc: response.data_persona.num_doc,
        genero: response.data_persona.genero,
        fecha_nacimiento: response.data_persona.fecha_nacimiento,
      }
    });
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
        num_doc: ['', Validators.required],
        genero: ['M', Validators.required],
        fecha_nacimiento: ['', Validators.required],
      })
    };

    return controls;
  }

  private prepareFechaNacimiento(fecha_nacimiento) {
    if (typeof fecha_nacimiento === 'string' || fecha_nacimiento instanceof String) {
      return fecha_nacimiento && fecha_nacimiento.split('T')[0];
    } else {
      return fecha_nacimiento && fecha_nacimiento.toISOString().split('T')[0];
    }
  }

  public onSubmit() {
    const value = this.asesorForm.value;
    const valid = this.asesorForm.valid;
    value.persona.fecha_nacimiento = this.prepareFechaNacimiento(value.persona.fecha_nacimiento);

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.asesor.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.asesoresReactiveService.update(value.id, value);
            this.dialogRef.close();
            this.asesorForm.reset();
          } else {
          }
        });
    }
  }
}
