import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { IEscuela } from '../shared/escuela';
import { EscuelaService } from '../shared/escuela.service';

import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'dgi-escuela-list',
  template: `
  <div class="escuela-container mat-elevation-z8">
  
    <div class="escuela-loading-shade"
      *ngIf="dataSource.isLoadingResults || dataSource.isRateLimitReached">
      <mat-spinner *ngIf="dataSource.isLoadingResults"></mat-spinner>
      <div class="escuela-rate-limit-reached" *ngIf="dataSource.isRateLimitReached">
        Se alcanzó el límite de la tasa API de ITesys. Se reiniciará en un minuto.
      </div>
    </div>
    <mat-table #table [dataSource]="dataSource" class="escuela-table"
    matSort matSortActive="fecha_creacion" matSortDisableClear matSortDirection="asc">
  
      <!--- Note that these columns can be defined in any order.
            The actual rendered columns are set as a property on the row definition" -->
  
      <!-- Checkbox Column -->
      <!-- <ng-container matColumnDef="select">
        <mat-header-cell *matHeaderCellDef> -->
          <!-- <mat-checkbox (change)="$event ? masterToggle() : null"
                       [checked]="isAllSelected()"
                       [indeterminate]="selection.hasValue() && !isAllSelected()">
          </mat-checkbox> -->
        <!-- </mat-header-cell>
        <mat-cell *matCellDef="let row"> -->
          <!-- <mat-checkbox (click)="$event.stopPropagation()"
                       (change)="$event ? selection.toggle(row.id) : null"
                       [checked]="selection.isSelected(row.id)">
          </mat-checkbox> -->
        <!-- </mat-cell>
      </ng-container> -->
  
      <!-- ID Column -->
      <ng-container matColumnDef="isId">
        <mat-header-cell *matHeaderCellDef mat-sort-header> ID </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.id}} </mat-cell>
      </ng-container>
  
      <!-- Nombre Column -->
      <ng-container matColumnDef="nombre">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Nombre </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.nombre}} </mat-cell>
      </ng-container>
  
      <!-- Descripcion Column -->
      <ng-container matColumnDef="alias">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Alias </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.alias}} </mat-cell>
      </ng-container>
  
      <!-- Activo Column -->
      <ng-container matColumnDef="activo">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Activo </mat-header-cell>
        <mat-cell *matCellDef="let row" [style.color]="row.activo"> {{row.activo}} </mat-cell>
      </ng-container>

      <!-- Logo Column -->
      <ng-container matColumnDef="logo">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Logo </mat-header-cell>
        <mat-cell *matCellDef="let row" [style.color]="row.logo"> {{row.logo}} </mat-cell>
      </ng-container>

      <!-- Facultad Column -->
      <ng-container matColumnDef="facultad">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Facultad </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.facultad}} </mat-cell>
      </ng-container>

      <!-- Fecha_creacion Column -->
      <ng-container matColumnDef="fecha_creacion">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Fecha creacion </mat-header-cell>
        <mat-cell *matCellDef="let row" [style.color]="row.fecha_creacion"> {{row.fecha_creacion}} </mat-cell>
      </ng-container>

      <!-- Fecha_actualizacion Column -->
      <ng-container matColumnDef="fecha_actualizacion">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Fecha actualizacion </mat-header-cell>
        <mat-cell *matCellDef="let row" [style.color]="row.fecha_actualizacion"> {{row.fecha_actualizacion}} </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;">
        <!-- [class.example-selected-row]="selection.isSelected(row.id)"
        (click)="selection.toggle(row.id)" -->
      </mat-row>
    </mat-table>
    <!--
    <div class="example-no-results"
         [style.display]="dataSource.renderedData.length == 0 ? '' : 'none'">
      No linea investigación found matching filter.
    </div> 
    -->
  
    <mat-paginator #paginator
    [length]="dataSource.resultsLength"
    [pageIndex]="0"
    [pageSize]="dataSource.pageSize"
    [pageSizeOptions]="[5, 10, 25, 100]"
    >
    <!-- [length]="lineaInvestigacionDataBase.data.length" -->
    <!-- [length]="dataSource.filteredData.length" -->
    </mat-paginator>
  </div>
  `,
  styles: []
})
export class EscuelaListComponent implements OnInit {
  displayedColumns = [
    'isId', 
    'nombre', 
    'alias', 
    'activo',
    'logo',
    'facultad',
    'fecha_creacion',
    'fecha_actualizacion',
  ];

  escuelaService: EscuelaService | null;
  dataSource: EscuelaDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.escuelaService = new EscuelaService(this.http)
    this.dataSource = new EscuelaDataSource(
      this.escuelaService, this.paginator, this.sort);
  }
}



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

  /** Función de conexión llamada por la tabla para recuperar una secuencia que contiene los datos para renderizar. */
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
