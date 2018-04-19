import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RolProcesoService } from '../../shared/rol-proceso.service';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from '../../../../config/general';
import { MESSAGES } from '../../../../config/messages';

@Component({
  selector: 'dgi-rol-proceso',
  templateUrl: './rol-proceso.component.html',
  styleUrls: ['./rol-proceso.component.scss']
})
export class RolProcesoComponent implements OnInit {

  public rolProcesoForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<RolProcesoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private rolProcesoService: RolProcesoService,
    private tdDialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {

    this.buildForm();
  }

  public buildForm() {
    const controls = this.initializeControls();
    this.rolProcesoForm = this.formBuilder.group(controls);
  }

  public initializeControls() {
    const controls = {
      nombre: ['', [Validators.required]],
      alias: ['', []],
      descripcion: ['', []],
      activo: [true, []],
      proceso: [this.data.procesoId, []],
    };

    return controls;
  }

  public onSubmit() {
    const valid = this.rolProcesoForm.valid;
    const value = this.rolProcesoForm.value;

    if (valid) {
      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.rolProceso.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.rolProcesoService.createRolProceso(value);
            this.dialogRef.close();
            this.rolProcesoForm.reset();
          } else {
          }
        });
    }
  }

}
