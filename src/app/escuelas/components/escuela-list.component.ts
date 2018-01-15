import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IEscuela, Escuela } from '../shared/escuela';
import { EscuelaService } from '../shared/escuela.service';


@Component({
  selector: 'dgi-escuela-list',
  template: `
    <dgi-escuela *ngFor="let escuela of escuelas"
      [escuela]="escuela"
      (onDeleteEscuela)="onDeleteEscuelaList.emit($event)"
      ></dgi-escuela>
  `,
  styles: [
    `
    :host {
      /*display: flex;
      flex-wrap: wrap;*/
      /*justify-content: center; */
      /* margin-top: 25px; */
    }
    /*
    .escuela-container {
      display: flex;
      flex-direction: column;
      min-width: 300px;
    }*/
    `
  ]
})
export class EscuelaListComponent implements OnInit {

  @Input() escuelas: Escuela[];
  @Output() onDeleteEscuelaList = new EventEmitter<string>();

  constructor( ) { }

  ngOnInit() {

  }
}


/*
export class EscuelaDataSource extends DataSource<IEscuela> {

  // La cantidad de problemas devueltos por github que coinciden con la consulta.
  public resultsLength = 0;
  public isLoadingResults = false;
  public isRateLimitReached = false;
  public pageSize = 5;

  constructor(
    private escuelaService: EscuelaService,
    private paginator: MatPaginator,
    private sort: MatSort,
  ) {
    super();
  }

  // Función de conexión llamada por la tabla para recuperar una secuencia que contiene los datos para renderizar.
  connect(): Observable<IEscuela[]>{
    const displayDataChanges = [
      this.sort.sortChange,
      this.paginator.page
    ];

    // Si el usuario cambia el orden de clasificación, restablecer a la primera página.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {

        setTimeout(() => {
          this.isLoadingResults = true;
        }, 0);

        // return this.escuelaService.escuelas;
        return this.escuelaService.response;
        // return this.escuelaService.getEscuelas$(
          // this.sort.active, this.sort.direction, this.paginator.pageIndex,
          // this.paginator.pageSize
        // )
      })
      .map(data => {
        // Da vuelta la bandera para mostrar que la carga ha terminado.
        setTimeout(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.options.count;
          this.pageSize = data.options.page_size;
        }, 0);

        return data.results;
      })
      .catch(() => {

        setTimeout(() => {
          this.isLoadingResults = false;
          // Capture si la API de Linea de investigación ha alcanzado su límite de velocidad. Devuelve datos vacíos.
          this.isRateLimitReached = true;
        }, 0);
        return Observable.of([]);
      });
  }

  disconnect() {}
}
*/
