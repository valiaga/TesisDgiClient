import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm, snackBarDuration } from 'config/general';
import { MESSAGES } from 'config/messages';
import { DocumentosService } from '../../shared/documentos.service';

@Component({
  selector: 'dgi-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {
  public documentoForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    private documentosService: DocumentosService,
    private tdDialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.patchForm();
  }

  public patchForm() {
    this.documentosService.getById$(this.data.documentoId)
    .subscribe(this.patchToForm.bind(this));
  }

  private patchToForm(response) {
    this.documentoForm.patchValue({
      id: response.id,
      nombre: response.nombre,
      alias: response.alias,
      descripcion: response.descripcion,
      llave_documento: response.llave_documento,
      activo: response.activo,
    });
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.documentoForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      id: [''],
      nombre: ['', Validators.required],
      alias: ['', Validators.required],
      descripcion: [''],
      llave_documento: ['', Validators.required],
      activo: [true, Validators.required],
    };

    return controls;
  }

  public onSubmit() {
    const value = this.documentoForm.value;
    const valid = this.documentoForm.valid;

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.documento.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.documentosService.update$(value.id, value).subscribe(documento => {
              this.snackBar.open(MESSAGES.documento.post, MESSAGES.actions.post, snackBarDuration);
              this.dialogRef.close(true);
              this.documentoForm.reset();
            });
          } else {
          }
        });
    }
  }
}
