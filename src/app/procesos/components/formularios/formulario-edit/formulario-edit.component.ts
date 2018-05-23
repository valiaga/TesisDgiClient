import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from '../../../../../config/general';
import { MESSAGES } from '../../../../../config/messages';
import { FormularioService } from '../../../../formularios/shared/formulario.service';

@Component({
    selector: 'dgi-formulario-edit',
    templateUrl: 'formulario-edit.component.html',
    styleUrls: ['formulario-edit.component.scss'],
})

export class FormularioEditComponent implements OnInit {

    public formForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<FormularioEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private tdDialogService: TdDialogService,
        private viewContainerRef: ViewContainerRef,
        private formularioService: FormularioService,
    ) { }

    ngOnInit() {

        this.buildForm();
    }

    public buildForm() {
        const controls = this.initializeControls();
        this.formForm = this.formBuilder.group(controls);
    }

    public initializeControls() {
        const controls = {
            id: [this.data.formulario.id],
            nombre: [this.data.formulario.nombre, [Validators.required]],
            alias: [this.data.formulario.alias, []],
            descripcion: [this.data.formulario.descripcion],
            tarea: [this.data.formulario.tarea, [Validators.required]],
            orden: [this.data.formulario.orden, [Validators.required]],
            width: [this.data.formulario.width, [Validators.required]],
        };

        return controls;
    }

    public onSubmit() {
        const valid = this.formForm.valid;
        const value = this.formForm.value;
        if (valid) {
            this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.formulario.confirmCreate, this.viewContainerRef))
                .afterClosed().subscribe((accept: boolean) => {
                    if (accept) {
                        this.formularioService.update$(value.id, value).subscribe(res => {
                            this.dialogRef.close(value.tarea);
                            this.formForm.reset();
                        });
                    } else {
                    }
                });
        }
    }
}
