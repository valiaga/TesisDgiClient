import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RolProcesoService } from '../../../../rol-proceso/shared/rol-proceso.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '../../../../../../node_modules/@angular/forms';
import { CamposService } from '../../../../campos/shared/campos.service';

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

    // public validadores: any[] = [];
    constructor(private dialogRef: MatDialogRef<ValidadorNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private campoService: CamposService,
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
            formulario: [this.data.formulario.id],
            tipoDeValidacion: [false, [Validators.required]],
            // unaVezPorRol: [false, [Validators.required]],
            // unaVezPorUsuario: [false, [Validators.required]],
            roles: [[]],
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
            console.log(value);
            console.log(this.rolProcesosCheckeds);
            this.campoService.addValidador$(value).subscribe(response => {

            });
        }
    }
}
