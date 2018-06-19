import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AsesoresService, AsesoresReactiveService } from '../../shared/asesores.service';
import { Asesor } from '../../shared/asesor';
import { MatDialog } from '@angular/material';
import { FormNewComponent, FormEditComponent } from '../../components';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';

@Component({
    selector: 'dgi-find-page',
    templateUrl: 'find-page.component.html',
})

export class FindPageComponent implements OnInit {
    public asesores$: Observable<Asesor[]>;

    constructor(
        private asesoresReactiveService: AsesoresReactiveService,
        private dialog: MatDialog,
        private viewContainerRef: ViewContainerRef,
        private tdDialogService: TdDialogService,
    ) { }

    ngOnInit() {

        this.asesores$ = this.asesoresReactiveService.asesores;
        this.getAsesores();
    }

    private getAsesores() {
        this.asesoresReactiveService.getList();
    }

    public openDialog() {
        const dialogRef = this.dialog.open(FormNewComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('close dialog asesor');
        });
    }

    public onUpdateAsesor(event) {
        console.log('Update: ', event);
        const dialogRef = this.dialog.open(FormEditComponent, {
            width: '500px',
            data: {
                asesorId: event,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('close dialog asesor');
        });

    }
    public onDeleteAsesor(event) {
        this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.asesor.confirmDelete, this.viewContainerRef))
            .afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    this.asesoresReactiveService.delete(event);
                } else {
                }
            });
    }
}
