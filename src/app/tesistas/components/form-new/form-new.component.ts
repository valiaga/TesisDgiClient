import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm, snackBarDuration } from 'config/general';
import { MESSAGES } from 'config/messages';
// import { DictaminadoresReactiveService } from '../../shared/dictaminadores.service';
import { TesistasService } from '../../shared/tesistas.service';

@Component({
  selector: 'dgi-form-new',
  templateUrl: './form-new.component.html',
  styleUrls: ['./form-new.component.scss'],
})
export class FormNewComponent implements OnInit {
  public tesistaForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormNewComponent>,
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private tdDialogService: TdDialogService,
    private tesistasService: TesistasService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.buildForm();
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
      })
    };

    return controls;
  }

  private prepareFechaNacimiento(fecha_nacimiento) {
    return fecha_nacimiento && fecha_nacimiento.toISOString().split('T')[0];
  }

  public onSubmit() {
    const value = this.tesistaForm.value;
    const valid = this.tesistaForm.valid;

    value.persona.fecha_nacimiento = this.prepareFechaNacimiento(value.persona.fecha_nacimiento);

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.dictaminador.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.tesistasService.add$(value).subscribe(tesista => {
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
