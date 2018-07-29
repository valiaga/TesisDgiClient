import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm, snackBarDuration } from 'config/general';
import { MESSAGES } from 'config/messages';
import { DocumentosService } from '../../shared/documentos.service';

@Component({
  selector: 'dgi-form-new',
  templateUrl: './form-new.component.html',
  styleUrls: ['./form-new.component.scss'],
})
export class FormNewComponent implements OnInit {
  public documentoForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormNewComponent>,
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private tdDialogService: TdDialogService,
    private documentosService: DocumentosService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.buildForm();
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

            this.documentosService.add$(value).subscribe(documento => {
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
