import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../../../../tareas/shared/tarea';
import { RolProceso } from '../../../../rol-proceso/shared/rol-proceso.model';
import { RolProcesoService } from '../../../../rol-proceso/shared/rol-proceso.service';
import { TareaReactiveService } from '../../../../tareas/shared/tarea.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { getMessageConfirm } from '../../../../../config/general';
import { TdDialogService } from '@covalent/core';
import { MESSAGES } from '../../../../../config/messages';
import { map } from 'rxjs/operators';

@Component({
    selector: 'dgi-tarea-new',
    templateUrl: 'tarea-new.component.html',
    styleUrls: ['./tarea-new.component.scss'],
})

export class TareaNewComponent implements OnInit {

    public tareas$: Observable<Tarea[]>;
    public rolesEjecuta$: Observable<RolProceso[]>;

    public tareaForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<TareaNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private rolProcesoService: RolProcesoService,
        private tareaReactiveService: TareaReactiveService,
        private formBuilder: FormBuilder,
        private tdDialogService: TdDialogService,
        private viewContainerRef: ViewContainerRef,
    ) { }

    ngOnInit() {
        this.rolesEjecuta$ = this.rolProcesoService.rolProcesos
            .pipe(
                map(res => res.filter(ress => ress.activo === true))
            );

        this.tareas$ = this.tareaReactiveService.tareas;

        this.buildForm();
    }


    public buildForm() {
        const controls = this.initializeControls();
        this.tareaForm = this.formBuilder.group(controls);
    }

    public initializeControls() {
        const controls = {
            id: [''],
            nombre: ['', [Validators.required]],
            descripcion: ['', []],
            etapa: [this.data.etapaId, [Validators.required]],
            anterior: [''],
            rol_ejecuta: ['', [Validators.required]],
            plazo_dias: ['', [Validators.required]],
            req_res_activador: ['', []],
            req_res_desactivador: ['', []],
            orden: ['', [Validators.required]],
        };

        return controls;
    }

    public onSubmit() {
        const valid = this.tareaForm.valid;
        const value = this.tareaForm.value;
        // console.log('save', value);
        if (valid) {
            this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.etapa.confirmCreate, this.viewContainerRef))
                .afterClosed().subscribe((accept: boolean) => {
                    if (accept) {

                        this.tareaReactiveService.create(value);
                        this.dialogRef.close();
                        this.tareaForm.reset();
                    } else {
                    }
                });
        }
    }
}
