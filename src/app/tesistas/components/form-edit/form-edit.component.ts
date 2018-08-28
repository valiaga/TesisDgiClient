import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm, snackBarDuration } from 'config/general';
import { MESSAGES } from 'config/messages';
import { TesistasService } from '../../shared/tesistas.service';
// import { DictaminadoresService, DictaminadoresReactiveService } from '../../shared/dictaminadores.service';

@Component({
  selector: 'dgi-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss'],
})
export class FormEditComponent implements OnInit {
  public tesistaForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    private tesistasService: TesistasService,
    private tdDialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.patchForm();
  }

  public patchForm() {
    this.tesistasService.getById$(this.data.tesistaId)
      .subscribe(this.patchToForm.bind(this));
  }

  private patchToForm(response) {
    this.tesistaForm.patchValue({
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
      },
    });
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.tesistaForm = this.formBuilder.group(controls);
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
      }),
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
    const value = this.tesistaForm.value;
    const valid = this.tesistaForm.valid;
    value.persona.fecha_nacimiento = this.prepareFechaNacimiento(value.persona.fecha_nacimiento);

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.dictaminador.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.tesistasService.update$(value.id, value).subscribe(tesista => {
              this.snackBar.open(MESSAGES.tesista.post, MESSAGES.actions.post, snackBarDuration);
              this.dialogRef.close(true);
              this.tesistaForm.reset();
            });
          } else {
          }
        });
    }
  }
}
