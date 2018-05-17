import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from '../../../../../config/general';
import { MESSAGES } from '../../../../../config/messages';

@Component({
    selector: 'dgi-formulario-new',
    templateUrl: 'formulario-new.component.html',
    styleUrls: ['formulario-new.component.scss'],
})

export class FormularioNewComponent implements OnInit {

    public formForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<FormularioNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private tdDialogService: TdDialogService,
        private viewContainerRef: ViewContainerRef,
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
            id: [''],
            nombre: ['', [Validators.required]],
            alias: ['', []],
            descripcion: [],
            tarea: [this.data.tareaId, [Validators.required]],
            orden: ['', [Validators.required]],
            width: [100, [Validators.required]],
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

                        // this.tareaReactiveService.create(value);
                        // this.dialogRef.close();
                        // this.tareaForm.reset();
                    } else {
                    }
                });
        }
    }
}
