import { TesisProceso } from '../shared/tesis-proceso';
import { TesisProcesoService } from '../shared/tesis-proceso.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateTesisProcesoDialogComponent } from '../containers/create-tesis-proceso-dialog.component';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'dgi-tesis-proceso-list',
  template: `
      <div class="card-container">  
        <mat-card *ngFor="let tp of tesisProcesos$ | async" class="mat-card">
          <mat-card-header>
            <!-- <div mat-card-avatar class="example-header-image"></div> -->
            <mat-card-title><p>{{ tp.proyecto }}</p> </mat-card-title>
            <mat-card-subtitle>Vitmar Aliaga & Alejandro Carpio</mat-card-subtitle>
          </mat-card-header>
          <!-- <img mat-card-image src="http://wellmedicated.com/wp-content/uploads/2009/06/moral-relativism.jpg" alt="Mi Libro">      -->
          <mat-card-content>
              <!-- <img src="http://wellmedicated.com/wp-content/uploads/2009/06/moral-relativism.jpg" alt=""> -->
              <!-- {{ tp.id }}-->
          </mat-card-content>
        </mat-card>
        <!-- <a mat-fab class="button-add-fab" routerLink="/procesos/nuevo"><mat-icon>add</mat-icon></a> -->
        <a mat-fab class="button-add-fab" (click)="openDialog()"><mat-icon>add</mat-icon></a>
      </div>  
    `,
  styles: [
    `
    .card-container{
      display: flex;
      flex-flow: row wrap;
    }
    
    .mat-card{
        width: 10em;
        min-width: 10em;
    }
    
    .mat-card:hover {
        box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    
    .button-add-fab{
        position: absolute;
        right: 20px;
        bottom: 20px
    }
    `
  ]
})
export class TesisProcesoListComponent implements OnInit {

  private tesisProcesos$: Observable<TesisProceso[]>
  private proceso_id: string = '';

  constructor(private route: ActivatedRoute, 
              private tesisProcesoService: TesisProcesoService,
              private dialog: MatDialog) { }
              
  // La carga de datos se hace al iniciarse el componente
  // este es el lugar donde programar lógica de inicio
  // nunca en el constructor
  ngOnInit() {
    console.log('Hola vitmar estamos en tesis proceso.')

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
    console.log('getProyectos');
    console.log(proceso_id);
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

        this.tesisProcesos$ = this.tesisProcesoService.getTesisProcesosByProcesoId$(this.proceso_id.toString());
      });
  }

}