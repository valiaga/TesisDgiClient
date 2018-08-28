import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PersonasService, PersonasReactiveService } from '../../shared/personas.service';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';

@Component({
  selector: 'dgi-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss'],
})
export class FormEditComponent implements OnInit {
  public personaForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    private personasService: PersonasService,
    private tdDialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
    private personasReactiveService: PersonasReactiveService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.patchForm();
  }

  public patchForm() {
    this.personasService.getById$(this.data.personaId)
      .subscribe(this.patchToForm.bind(this));
  }

  private patchToForm(response) {
    this.personaForm.patchValue({
      id: response.id,
      nombres: response.nombres,
      apellido_paterno: response.apellido_paterno,
      apellido_materno: response.apellido_materno,
      num_doc: response.num_doc,
      genero: response.genero,
      fecha_nacimiento: response.fecha_nacimiento,
    });
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.personaForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      id: [''],
      nombres: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      num_doc: ['', Validators.required],
      genero: ['M', Validators.required],
      fecha_nacimiento: ['', Validators.required],
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
    const value = this.personaForm.value;
    const valid = this.personaForm.valid;
    value.fecha_nacimiento = this.prepareFechaNacimiento(value.fecha_nacimiento);

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.persona.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.personasReactiveService.update(value.id, value);
            this.dialogRef.close();
            this.personaForm.reset();
          } else {
          }
        });
    }
  }
}
