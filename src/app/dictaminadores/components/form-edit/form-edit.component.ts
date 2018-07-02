import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { DictaminadoresService, DictaminadoresReactiveService } from '../../shared/dictaminadores.service';

@Component({
  selector: 'dgi-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {
  public dictaminadorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    private dictaminadoresService: DictaminadoresService,
    private tdDialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
    private dictaminadoresReactiveService: DictaminadoresReactiveService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.patchForm();
  }

  public patchForm() {
    this.dictaminadoresService.getById$(this.data.asesorId)
      .subscribe(this.patchToForm.bind(this));
  }

  private patchToForm(response) {
    // console.log(response);
    this.dictaminadorForm.patchValue({
      id: response.id,
      activo: response.activo,
      persona: {
        id: response.persona.id,
        nombres: response.persona.nombres,
        apellido_paterno: response.persona.apellido_paterno,
        apellido_materno: response.persona.apellido_materno,
        genero: response.persona.genero,
        fecha_nacimiento: response.persona.fecha_nacimiento,
      }
    });
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.dictaminadorForm = this.formBuilder.group(controls);
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
    const value = this.dictaminadorForm.value;
    const valid = this.dictaminadorForm.valid;
    value.persona.fecha_nacimiento = this.prepareFechaNacimiento(value.persona.fecha_nacimiento);

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.dictaminador.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.dictaminadoresReactiveService.update(value.id, value);
            this.dialogRef.close();
            this.dictaminadorForm.reset();
          } else {
          }
        });
    }
  }
}
