import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PerfilesService } from '../../shared/perfiles.service';
import { Perfil } from '../../shared/perfil';
import { MatDialog, MatSnackBar } from '@angular/material';
// import { FormNewComponent, FormEditComponent, FormVinculeComponent } from '../../components';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { TdDialogService } from '@covalent/core';
// import { getMessageConfirm } from 'config/general';
// import { MESSAGES } from 'config/messages';
// import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormNewComponent } from '../../components';
import { MESSAGES } from 'config/messages';
import { snackBarDuration } from 'config/general';

@Component({
    selector: 'dgi-find-page',
    templateUrl: 'find-page.component.html',
    styleUrls: ['find-page.component.scss'],
})

export class FindPageComponent implements OnInit {
    // public jurados$: Observable<Perfil[]>;
    public perfiles: Perfil[];

    constructor(
        private perfilesService: PerfilesService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,

        // private viewContainerRef: ViewContainerRef,
        // private tdDialogService: TdDialogService,
        // private router: Router,
        // private route: ActivatedRoute,
    ) { }

    ngOnInit() {

        // this.jurados$ = this.juradosReactiveService.jurados;
        this.getPerfiles();
    }

    private getPerfiles() {
        const loadPerfiles = this.loadPerfiles.bind(this);
        this.perfilesService.getList$()
            .pipe(map(response => response.results))
            .subscribe(loadPerfiles);
    }

    private loadPerfiles(response) {
        this.snackBar.open(MESSAGES.perfil.getMany, MESSAGES.actions.get, snackBarDuration);
        this.perfiles = response;
    }

    public openDialog() {
        const dialogRef = this.dialog.open(FormNewComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('close dialog perfil');
            if (result) {
                this.getPerfiles();
            }
        });
    }

    public onVincule() {
        // const dialogRef = this.dialog.open(FormVinculeComponent, {
        // width: '500px',
        // });
        // dialogRef.afterClosed().subscribe(result => {
        // console.log('close dialog vincule jurado');
        // });
    }

    // public onUpdateJurado(event) {
    // console.log('Update: ', event);
    // const dialogRef = this.dialog.open(FormEditComponent, {
    // width: '500px',
    // data: {
    // juradoId: event,
    // },
    // });

    // dialogRef.afterClosed().subscribe(result => {
    // console.log('close dialog jurado');
    // });
    // }

    // public onDeleteJurado(event) {
    //     this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.jurado.confirmDelete, this.viewContainerRef))
    //         .afterClosed().subscribe((accept: boolean) => {
    //             if (accept) {
    //                 this.juradosReactiveService.delete(event);
    //             } else {
    //             }
    //         });
    // }

    // public onGetProyectos(event) {
    //     this.router.navigate(['./', event, 'proyectos'], { relativeTo: this.route });
    // }
}
