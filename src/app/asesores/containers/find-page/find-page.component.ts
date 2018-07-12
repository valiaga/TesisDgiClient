import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AsesoresService, AsesoresReactiveService } from '../../shared/asesores.service';
import { Asesor } from '../../shared/asesor';
import { MatDialog } from '@angular/material';
import { FormNewComponent, FormEditComponent, FormVinculeComponent } from '../../components';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dgi-find-page',
    templateUrl: 'find-page.component.html',
    styles: [`
        .button-fab{
            position: absolute;
            right: 90px;
            bottom: 20px
        }
    `]
})

export class FindPageComponent implements OnInit {
    public asesores$: Observable<Asesor[]>;

    constructor(
        private asesoresReactiveService: AsesoresReactiveService,
        private dialog: MatDialog,
        private viewContainerRef: ViewContainerRef,
        private tdDialogService: TdDialogService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {

        this.asesores$ = this.asesoresReactiveService.asesores;
        this.getAsesores();
    }

    private getAsesores() {
        const params = {
            page_size: 15,
        };
        this.asesoresReactiveService.getList(params);
    }

    public openDialog() {
        const dialogRef = this.dialog.open(FormNewComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('close dialog asesor');
        });
    }

    public onVincule() {
        const dialogRef = this.dialog.open(FormVinculeComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('close dialog vincule asesor');
        });
    }

    public onUpdateAsesor(event) {
        // console.log('Update: ', event);
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

    public onGetProyectos(event) {
        this.router.navigate(['./', event, 'proyectos'], { relativeTo: this.route });
    }
}
