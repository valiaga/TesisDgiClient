import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { RolProcesoService } from '../../../../rol-proceso/shared/rol-proceso.service';
import { map } from 'rxjs/operators';
import { CamposService } from '../../../../campos/shared/campos.service';
import { getMessageConfirm, snackBarDuration } from 'config/general';
import { MESSAGES } from 'config/messages';

@Component({
  selector: 'dgi-validador-edit',
  templateUrl: './validador-edit.component.html',
  styleUrls: ['./validador-edit.component.scss']
})
export class ValidadorEditComponent implements OnInit {
  public validadorForm: FormGroup;
  public procesoId: string;
  public rolProcesos: any[];
  public rolProcesosCheckeds: any[] = [];

  constructor(private dialogRef: MatDialogRef<ValidadorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private camposService: CamposService,
    private rolProcesoService: RolProcesoService,
    private viewContainerRef: ViewContainerRef,
    private tdDialogService: TdDialogService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.procesoId = this.data.procesoId;
    this.loadMasters();
    this.buildForm();
    this.getCampoById(this.data.campoId);
  }

  private getCampoById(campoId) {
    this.camposService.getById$(campoId)
      .subscribe(this.loadCampo.bind(this));
  }

  private loadCampo(campo) {
    // this.tipoCampo = campo.type;
    // this.tareaId = campo.tarea;
    this.validadorForm.patchValue({
      id: campo.id,
      label: campo.label,
      name: campo.name,
      icon: campo.icon,
      hint_start: campo.hint_start,
      formulario: campo.formulario,
      order: campo.order,
      tipo_validador: campo.tipo_validador,
      type: campo.type,
      width: campo.width,
    });

    this.rolProcesos = this.rolProcesos && this.rolProcesos.map(res => {
      res.checked = this.rolProcesoInclude(campo.roles_validadores, res.id) ? true : false;
      if (res.checked) { this.rolProcesosCheckeds.push(res.id); }
      return res;
    });
  }

  private rolProcesoInclude(roles_validadores, idRol) {
    const arrayy = roles_validadores.split(',');
    if (arrayy.indexOf(idRol) === -1) { return false; }
    return true;
  }

  public onDeleteFieldValidador() {
    this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.campo.confirmDelete, this.viewContainerRef))
      .afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.camposService.delete$(this.data.campoId).subscribe(res => {
            this.snackBar.open(MESSAGES.campo.delete, MESSAGES.actions.delete, snackBarDuration);
            this.dialogRef.close();
            this.validadorForm.reset();
          });
        } else {
        }
      });
  }

  public onChangeCheckedRolProceso(event, id) {
    if (event.checked) {
      this.rolProcesosCheckeds.push(id);
    } else {
      const indexx = this.rolProcesosCheckeds.indexOf(id);
      this.rolProcesosCheckeds.splice(indexx, 1);
    }
  }

  private loadMasters() {
    this.rolProcesoService.getWithQuery$({ proceso_id: this.procesoId })
      .pipe(map(res => res.results))
      .subscribe(response => {
        this.rolProcesos = response.map(res => ({ ...res, checked: false }));
      });
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.validadorForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      id: ['', [Validators.required]],
      label: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      width: ['', [Validators.required]],
      icon: [''],
      hint_start: [''],
      order: ['', [Validators.required]],
      formulario: ['', [Validators.required]],
      tipo_validador: ['', [Validators.required]],
      roles: [],
    };
    return controls;
  }

  public onSubmit() {
    const value = this.validadorForm.value;
    const valid = this.validadorForm.valid;

    if (valid) {
      const dataSend: any = {
        id: value.id,
        label: value.label,
        name: value.name, // pk
        type: value.type,
        width: value.width,
        // validation: [],
        icon: value.icon,
        hint_start: value.hint_start,
        order: value.order,
        formulario: value.formulario,
        tipo_validador: value.tipo_validador,
        roles_validadores: this.rolProcesosCheckeds.join(','),
      };
      // console.log('dataSend ', dataSend);

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.campo.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.camposService.update$(dataSend.id, dataSend).subscribe(response => {
              this.snackBar.open(MESSAGES.campo.put, MESSAGES.actions.put, snackBarDuration);
              this.dialogRef.close();
              this.validadorForm.reset();
            });
          } else {
          }
        });
    }
  }
}
