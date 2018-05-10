import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from '../../../../../config/general';
import { MESSAGES } from '../../../../../config/messages';
import { RequisitoReactiveService } from '../../../../requisitos/shared/requisitos.service';

@Component({
    selector: 'dgi-requisito-new',
    templateUrl: 'requisito-new.component.html',
    styles: [`
        .requisito-container {
            display: flex;
            flex-direction: column;
        }
        .requisito-container .checkbox {
            margin-bottom: 20px;
        }
    `],
})

export class RequisitoNewComponent implements OnInit {

    public requisitoForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<RequisitoNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private tdDialogService: TdDialogService,
        private viewContainerRef: ViewContainerRef,
        private requisitoReactiveService: RequisitoReactiveService,
        private formBuilder: FormBuilder, ) { }

    ngOnInit() {
        this.buildForm();
    }

    public buildForm() {
        const controls = this.initializeControls();
        this.requisitoForm = this.formBuilder.group(controls);
    }

    public initializeControls() {
        const controls = {
            id: [''],
            nombre: ['', [Validators.required]],
            tarea: [[this.data.tareaId], [Validators.required]],
            tipo: ['', Validators.required],
            plazo_dias: ['', [Validators.required]],
            activo: [true],
            descripcion: [''],
        };
        return controls;
    }

    public onSubmit() {
        const valid = this.requisitoForm.valid;
        const value = this.requisitoForm.value;
        // console.log('save', value);
        if (valid) {
            this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.requisito.confirmCreate, this.viewContainerRef))
                .afterClosed().subscribe((accept: boolean) => {
                    if (accept) {

                        this.requisitoReactiveService.createRequisito(value);
                        this.dialogRef.close();
                        this.requisitoForm.reset();
                    } else {
                    }
                });
        }
    }
}
