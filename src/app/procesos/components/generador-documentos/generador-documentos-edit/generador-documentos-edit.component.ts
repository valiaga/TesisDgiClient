import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DocumentosService } from '../../../../documentos/shared/documentos.service';
import { CamposService } from '../../../../campos/shared/campos.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm, snackBarDuration } from 'config/general';
import { MESSAGES } from 'config/messages';

@Component({
    selector: 'dgi-generador-documentos-edit',
    templateUrl: 'generador-documentos-edit.component.html',
    styleUrls: ['generador-documentos-edit.component.scss'],
})

export class GeneradorDocumentosEditComponent implements OnInit {
    public documentos: any[];
    public campos: any[];

    public generadorDocForm: FormGroup;
    public camposCheckeds: any[] = [];

    constructor(private dialogRef: MatDialogRef<GeneradorDocumentosEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private camposService: CamposService,
        private formBuilder: FormBuilder,
        private tdDialogService: TdDialogService,
        private viewContainerRef: ViewContainerRef,
        private snackBar: MatSnackBar,
        private documentosService: DocumentosService) { }

    ngOnInit() {

        this.loadMaestros();
        this.buildForm();
        this.getCampoById(this.data.campoId);
    }

    private getCampoById(campoId) {
        this.camposService.getById$(campoId)
            .subscribe(this.loadCampo.bind(this));
    }

    private loadCampo(campo) {
        // console.log(campo);

        // this.tipoCampo = campo.type;
        // this.tareaId = campo.tarea;
        this.generadorDocForm.patchValue({
            id: campo.id,
            label: campo.label,
            name: campo.name,
            icon: campo.icon,
            hint_start: campo.hint_start,
            formulario: campo.formulario,
            order: campo.order,
            type: campo.type,
            width: campo.width,
            documento: campo.documento,
        });
        this.getCampos(campo.campos_validados, campo.formulario);
    }

    private campoInclude(campos_validados, idRol) {
        const arrayy = campos_validados.split(',');
        if (arrayy.indexOf(idRol) === -1) { return false; }
        return true;
    }

    private buildForm() {
        const controls = this.initializeControls();
        this.generadorDocForm = this.formBuilder.group(controls);
    }

    private initializeControls() {
        const controls = {
            id: ['', [Validators.required]],
            label: ['', [Validators.required]],
            name: ['', [Validators.required]],
            icon: [''],
            hint_start: [''],
            formulario: ['', [Validators.required]],
            order: ['', [Validators.required]],
            type: ['', Validators.required],
            width: ['', Validators.required],
            campos_validados: [],
            documento: ['', Validators.required],
        };
        return controls;
    }

    private loadMaestros() {
        this.documentosService.getWithQuery$({})
            .pipe(map(response => response.results))
            .subscribe(this.loadDocumentos.bind(this));
    }

    private getCampos(campos_validados, formularioId) {
        this.camposService.getWithQuery$({ formulario: formularioId })
            .subscribe(res => {
                this.loadCampos(campos_validados, res);
            });
    }


    public onDeleteFieldGeneradorDocumentos() {
        this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.campo.confirmDelete, this.viewContainerRef))
            .afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    this.camposService.delete$(this.data.campoId).subscribe(res => {
                        this.snackBar.open(MESSAGES.campo.delete, MESSAGES.actions.delete, snackBarDuration);
                        this.dialogRef.close();
                        this.generadorDocForm.reset();
                    });
                } else {
                }
            });
    }

    private loadDocumentos(response) {
        this.documentos = response;
    }
    private loadCampos(campos_validados, response) {
        this.campos = response.map(res => {
            res.checked = this.campoInclude(campos_validados, res.id) ? true : false;
            if (res.checked) { this.camposCheckeds.push(res.id); }
            return res;
        });
    }

    public onChangeCheckedCampo(event, id) {
        if (event.checked) {
            this.camposCheckeds.push(id);
        } else {
            const indexx = this.camposCheckeds.indexOf(id);
            this.camposCheckeds.splice(indexx, 1);
        }
    }

    public onSubmit() {
        const value = this.generadorDocForm.value;
        const valid = this.generadorDocForm.valid;
        value.name = (value.name).toLowerCase().replace(' ', '');
        value.campos_validados = this.camposCheckeds.join(',');

        if (valid) {
            // console.log(value);
            // console.log(this.camposCheckeds);

            this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.campo.confirmCreate, this.viewContainerRef))
                .afterClosed().subscribe((accept: boolean) => {
                    if (accept) {
                        this.camposService.update$(value.id, value).subscribe(response => {
                            // this.dialogRef.close(this.data.formulario.tarea);
                            this.snackBar.open(MESSAGES.campo.put, MESSAGES.actions.put, snackBarDuration);

                            this.dialogRef.close();
                            this.generadorDocForm.reset();
                        });
                    } else {
                    }
                });
        }
    }
}
