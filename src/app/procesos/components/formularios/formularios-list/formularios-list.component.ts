import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, ViewContainerRef } from '@angular/core';
// import { FormularioService } from '../../../../dynamic-form/shared/formulario.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, map, tap } from 'rxjs/operators';
import { FormToolsService } from '../../../../shared/form-tools.service';
import { MatDialog } from '@angular/material';
import { FormularioNewComponent } from '../formulario-new/formulario-new.component';
import { FormularioService } from '../../../../formularios/shared/formulario.service';
import { TareaService } from '../../../../tareas/shared/tarea.service';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { FormularioEditComponent } from '../formulario-edit/formulario-edit.component';
import { CamposNewComponent, CamposEditComponent } from '../../campos';
import { ValidadorNewComponent, ValidadorEditComponent } from '../../validadores';
import { GeneradorDocumentosNewComponent } from '../../generador-documentos';
import { GeneradorDocumentosEditComponent } from '../../generador-documentos/generador-documentos-edit/generador-documentos-edit.component';

@Component({
    selector: 'dgi-formularios-list',
    templateUrl: 'formularios-list.component.html',
    styleUrls: ['formularios-list.component.scss'],
})

export class FormulariosListComponent implements OnInit, AfterViewChecked {
    public formularios: any[];
    public tareaId: string;
    public procesoId: string;

    constructor(
        private formulariosService: FormularioService,
        private tareaService: TareaService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private formToolsService: FormToolsService,
        private changeDetector: ChangeDetectorRef,
        private tdDialogService: TdDialogService,
        private viewContainerRef: ViewContainerRef,
    ) { }

    ngOnInit() {
        this.loadMaters();
    }

    ngAfterViewChecked() {
        this.changeDetector.detectChanges();
    }

    private loadMaters() {
        this.route.params
            .pipe(
                // map(params => params['tareaId'].toString()),
                mergeMap((params: any) => {
                    this.tareaId = params['tareaId'].toString();
                    this.procesoId = params['id'].toString();
                    return this.tareaService.getFomulariosByTareaId$(this.tareaId);
                }))
            .subscribe(this.loadFormularios.bind(this));
    }

    private loadFormularios(formularios: any[]) {
        this.formularios = formularios;
    }

    public getFormClass(formulario: any) {
        return this.formToolsService.getFormClass(formulario);
    }

    public agregarValidador(formulario) {
        const dialogRef = this.dialog.open(ValidadorNewComponent, {
            width: '900px',
            data: { formulario: formulario, procesoId: this.procesoId },
        });

        dialogRef.afterClosed()
            .pipe(mergeMap(res => this.tareaService.getFomulariosByTareaId$(this.tareaId)))
            .subscribe(this.loadFormularios.bind(this));
    }

    public agregarGeneradordoc(formulario) {
        const dialogRef = this.dialog.open(GeneradorDocumentosNewComponent, {
            width: '900px',
            data: { formulario: formulario },
        });

        dialogRef.afterClosed()
            .pipe(mergeMap(res => this.tareaService.getFomulariosByTareaId$(this.tareaId)))
            .subscribe(this.loadFormularios.bind(this));
    }

    public update(field: any) {
        if (field.type === 'validador') {
            this.updateValidador(field.id);
        } else if (field.type === 'generar_documentos') {
            console.log(field);

            this.updateGeneradorDocumentos(field.id);
        } else {
            this.updateField(field.id);
        }
    }

    private updateField(fieldId: string) {
        const dialogRef = this.dialog.open(CamposEditComponent, {
            width: '900px',
            data: { campoId: fieldId },
        });

        dialogRef.afterClosed()
            .pipe(mergeMap(res => this.tareaService.getFomulariosByTareaId$(this.tareaId)))
            .subscribe(this.loadFormularios.bind(this));
    }

    private updateValidador(fieldId: string) {
        const dialogRef = this.dialog.open(ValidadorEditComponent, {
            width: '900px',
            data: { campoId: fieldId, procesoId: this.procesoId },
        });

        dialogRef.afterClosed()
            .pipe(mergeMap(res => this.tareaService.getFomulariosByTareaId$(this.tareaId)))
            .subscribe(this.loadFormularios.bind(this));
    }

    private updateGeneradorDocumentos(fieldId: string) {

        const dialogRef = this.dialog.open(GeneradorDocumentosEditComponent, {
            width: '900px',
            data: { campoId: fieldId, procesoId: this.procesoId },
        });

        dialogRef.afterClosed()
            .pipe(mergeMap(res => this.tareaService.getFomulariosByTareaId$(this.tareaId)))
            .subscribe(this.loadFormularios.bind(this));
    }

    public newFormulario() {

        const dialogRef = this.dialog.open(FormularioNewComponent, {
            width: '500px',
            data: { tareaId: this.tareaId },
        });
        dialogRef.afterClosed()
            .pipe(mergeMap((res) => this.tareaService.getFomulariosByTareaId$(this.tareaId)))
            .subscribe(this.loadFormularios.bind(this));
    }

    public editar(formulario: any) {
        const dialogRef = this.dialog.open(FormularioEditComponent, {
            width: '500px',
            data: { formulario: formulario },
        });
        dialogRef.afterClosed()
            .pipe(mergeMap((res) => this.tareaService.getFomulariosByTareaId$(this.tareaId)))
            .subscribe(this.loadFormularios.bind(this));
    }

    public agregarCampos(formulario: any) {
        const dialogRef = this.dialog.open(CamposNewComponent, {
            width: '900px',
            data: { formulario: formulario },
        });
        dialogRef.afterClosed()
            .pipe(mergeMap((res) => this.tareaService.getFomulariosByTareaId$(this.tareaId)))
            .subscribe(this.loadFormularios.bind(this));
    }

    public delete(formulario: any) {
        this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.formulario.confirmDelete, this.viewContainerRef))
            .afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    this.formulariosService.delete$(formulario.id)
                        .pipe(mergeMap((res) => this.tareaService.getFomulariosByTareaId$(formulario.tarea)))
                        .subscribe(this.loadFormularios.bind(this));
                } else {
                }
            });
    }
}
