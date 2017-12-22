import { TesisProceso } from '../shared/tesis-proceso';
import { TesisProcesoService } from '../shared/tesis-proceso.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CreateTesisProcesoDialogComponent } from '../containers/create-tesis-proceso-dialog.component';
import { Observable } from 'rxjs/Observable';
import { MESSAGES } from '../../../config/messages';


@Component({
  selector: 'dgi-tesis-proceso-list',
  template: `
    <div class="card-container">  
      <dgi-tesis-proceso *ngFor="let tesisProceso of tesisProcesos$ | async" [tesisProceso] = "tesisProceso">
      </dgi-tesis-proceso>

      <dgi-button-fab (click)="openDialog()" [color]="['accent']" [icon]="['add']"></dgi-button-fab>
    </div>  
      `,
  styles: [
    `
    .card-container{
      display: flex;
      flex-flow: row wrap;
    }
    `
  ]
})
export class TesisProcesoListComponent implements OnInit {

  private tesisProcesos$: Observable<TesisProceso[]>
  private proceso_id: string = '';

  constructor(private route: ActivatedRoute, 
              private tesisProcesoService: TesisProcesoService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }
              
  ngOnInit() {
    /*
    this.route.params
      .switchMap((params: Params) => {
        return this.getProyectos(params['proceso_id'])
      })
      .subscribe(da => console.log(da));
    */

    this.route.params.subscribe(params => {
      this.proceso_id = params['proceso_id'];
      if (this.proceso_id){
        this.getProyectos(this.proceso_id.toString());
      } else {
        console.log('No hay parametros');
      }
    });
  }

  getProyectos(proceso_id: string) {
    this.tesisProcesos$ = this.tesisProcesoService.getTesisProcesosByProcesoId$(proceso_id);
  }

  openDialog():void{
    let dialogRef = this.dialog.open(CreateTesisProcesoDialogComponent, {
      width: '500px',
      // data: {
      //   proyectoNombre: '...'
      // }
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result && result.submit){
        this.guardarTesisProceso(result.realData);
      }else{
        console.log('has cancel')
        console.log(result && result.realData)
      }
    });
  }

  guardarTesisProceso(data){
    data.proceso=this.proceso_id;
    this.tesisProcesoService
      .saveTesisProcesoAndProyecto(data)
      .subscribe(res => {
        this.snackBar.open(MESSAGES.tesisProceso.post, MESSAGES.actions.post, {
          duration: 3000,
        });
        this.tesisProcesos$ = this.tesisProcesoService.getTesisProcesosByProcesoId$(this.proceso_id.toString());
      });
  }

}