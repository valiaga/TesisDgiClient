import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RolProcesoService } from '../../../../rol-proceso/shared/rol-proceso.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CamposService } from '../../../../campos/shared/campos.service';
import { TdDialogService } from '@covalent/core';
import { MESSAGES } from 'config/messages';
import { getMessageConfirm, snackBarDuration } from 'config/general';

@Component({
    selector: 'dgi-validador-new',
    templateUrl: 'validador-new.component.html',
    styleUrls: ['validador-new.component.scss'],
})

export class ValidadorNewComponent implements OnInit {
    public procesoId: string;
    public validadorForm: FormGroup;
    public rolProcesos: any[];
    public rolProcesosCheckeds: any[] = [];

    constructor(private dialogRef: MatDialogRef<ValidadorNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private tdDialogService: TdDialogService,
        private viewContainerRef: ViewContainerRef,
        private camposService: CamposService,
        private snackBar: MatSnackBar,
        private rolProcesoService: RolProcesoService) {
    }

    ngOnInit() {
        this.procesoId = this.data.procesoId;
        this.loadMasters();
        this.buildForm();
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
            label: ['', [Validators.required]],
            name: ['', [Validators.required]],
            // width: ['', [Validators.required]],
            icon: [''],
            hint_start: [''],
            formulario: [this.data.formulario.id, [Validators.required]],
            order: ['', [Validators.required]],
            tipo_validador: ['G', [Validators.required]],
            roles: [],
        };
        return controls;
    }

    public onChangeCheckedRolProceso(event, id) {
        if (event.checked) {
            this.rolProcesosCheckeds.push(id);
        } else {
            const indexx = this.rolProcesosCheckeds.indexOf(id);
            this.rolProcesosCheckeds.splice(indexx, 1);
        }
    }

    public onSubmit() {
        const value = this.validadorForm.value;
        const valid = this.validadorForm.valid;

        if (valid) {
            const dataSend: any = {
                label: value.label,
                name: value.name, // pk
                type: 'validador',
                width: '100',
                // validation: [],
                icon: value.icon,
                hint_start: value.hint_start,
                order: value.order,
                formulario: value.formulario,
                tipo_validador: value.tipo_validador,
                roles_validadores: this.rolProcesosCheckeds.join(','),
            };

            this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.campo.confirmCreate, this.viewContainerRef))
                .afterClosed().subscribe((accept: boolean) => {
                    if (accept) {
                        this.camposService.add$(dataSend).subscribe(response => {
                            this.snackBar.open(MESSAGES.campo.post, MESSAGES.actions.post, snackBarDuration);
                            this.dialogRef.close(this.data.formulario.tarea);
                            this.validadorForm.reset();
                        });
                    } else {
                    }
                });
        }
    }
}
