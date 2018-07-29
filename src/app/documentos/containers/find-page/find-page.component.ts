import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { FormNewComponent, FormEditComponent } from '../../components';
import { MESSAGES } from 'config/messages';
import { snackBarDuration } from 'config/general';
import { DocumentosService } from '../../shared/documentos.service';
import { IDocumento } from '../../shared/documento';

@Component({
    selector: 'dgi-find-page',
    templateUrl: 'find-page.component.html',
    styleUrls: ['find-page.component.scss'],
})

export class FindPageComponent implements OnInit {
    public documentos: IDocumento[];

    constructor(
        private documentosService: DocumentosService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,

        // private viewContainerRef: ViewContainerRef,
        // private tdDialogService: TdDialogService,
        // private router: Router,
        // private route: ActivatedRoute,
    ) { }

    ngOnInit() {

        // this.jurados$ = this.juradosReactiveService.jurados;
        this.getDocumentos();
    }

    private getDocumentos() {
        const loadDocumentos = this.loadDocumentos.bind(this);
        this.documentosService.getWithQuery$({})
            .pipe(map(response => response.results))
            .subscribe(loadDocumentos);
    }

    private loadDocumentos(response) {
        this.snackBar.open(MESSAGES.documento.getMany, MESSAGES.actions.get, snackBarDuration);
        this.documentos = response;
    }

    public openDialog() {
        const dialogRef = this.dialog.open(FormNewComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getDocumentos();
            }
        });
    }

    public onDelete(event: string[]) {
        event.forEach(documentoId => {
            this.documentosService.delete$(documentoId).subscribe(response => {
                this.snackBar.open(MESSAGES.documento.deleteAll, MESSAGES.actions.delete, snackBarDuration);
                this.getDocumentos();
            });
        });
    }

    public onUpdateDocumento(event) {
        const dialogRef = this.dialog.open(FormEditComponent, {
            width: '500px',
            data: {
                documentoId: event,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getDocumentos();
            }
        });
    }

    // public onVincule() {
    //     const dialogRef = this.dialog.open(FormVinculeComponent, {
    //         width: '500px',
    //     });
    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             this.getDocumentos();
    //         }
    //     });
    // }
}
