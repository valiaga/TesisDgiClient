import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { PersonasReactiveService } from '../../shared/personas.service';

@Component({
  selector: 'dgi-form-new',
  templateUrl: './form-new.component.html',
  styleUrls: ['./form-new.component.scss'],
})
export class FormNewComponent implements OnInit {
  public personaForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormNewComponent>,
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private tdDialogService: TdDialogService,
    private personasReactiveService: PersonasReactiveService,
  ) { }

  ngOnInit() {
    this.buildForm();
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
    return fecha_nacimiento && fecha_nacimiento.toISOString().split('T')[0];
  }

  public onSubmit() {
    const value = this.personaForm.value;
    const valid = this.personaForm.valid;

    value.fecha_nacimiento = this.prepareFechaNacimiento(value.fecha_nacimiento);

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.persona.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.personasReactiveService.add(value);
            this.dialogRef.close();
            this.personaForm.reset();
          } else {
          }
        });
    }
  }

}
