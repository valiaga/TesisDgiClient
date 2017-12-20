import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ILineaInvestigacion, LineaInvestigacion } from '../shared/linea-investigacion';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LineaInvestigacionService } from '../shared/linea-investigacion.service';

import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'dgi-linea-investigacion-list',
  template: `
  <div class="linea-investigacion-container mat-elevation-z8">
  
    <div class="example-loading-shade"
      *ngIf="dataSource.isLoadingResults || dataSource.isRateLimitReached">
      <mat-spinner *ngIf="dataSource.isLoadingResults"></mat-spinner>
      <div class="example-rate-limit-reached" *ngIf="dataSource.isRateLimitReached">
        Se alcanzó el límite de la tasa API de GitHub. Se reiniciará en un minuto.
      </div>
    </div>
    <mat-table #table [dataSource]="dataSource" class="example-table"
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
      <ng-container matColumnDef="descripcion">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Descripcion </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.descripcion}} </mat-cell>
      </ng-container>
  
      <!-- Activo Column -->
      <ng-container matColumnDef="activo">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Activo </mat-header-cell>
        <mat-cell *matCellDef="let row" [style.color]="row.activo"> {{row.activo}} </mat-cell>
      </ng-container>

      <!-- Escuela Column -->
      <ng-container matColumnDef="escuela">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Escuela </mat-header-cell>
        <mat-cell *matCellDef="let row" [style.color]="row.escuela"> {{row.escuela}} </mat-cell>
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
    [pageSize]="5"
    [pageSizeOptions]="[5, 10, 25, 100]"
    >
    <!-- [length]="lineaInvestigacionDataBase.data.length" -->
    <!-- [length]="dataSource.filteredData.length" -->
    </mat-paginator>
  </div>
  `,
  styles: [
    `
    /* Structure */
    .linea-investigacion-container {
      display: flex;
      flex-direction: column;
      min-width: 300px;
    }

    /*
    .example-header {
      min-height: 64px;
      display: flex;
      align-items: center;
      padding-left: 24px;
      font-size: 20px;
    } */
    
    .mat-table {
      overflow: auto;
      max-height: 500px;
    }

    .example-loading-shade {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 56px;
      right: 0;
      background: rgba(0, 0, 0, 0.15);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .example-rate-limit-reached {
      color: #980000;
      max-width: 360px;
      text-align: center;
    }
    `
  ]
})
export class LineaInvestigacionListComponent implements OnInit {
  displayedColumns = [
    'isId', 
    'nombre', 
    'descripcion', 
    'activo',
    'escuela',
    'fecha_creacion',
    'fecha_actualizacion',
  ];

  lineaInvestigacionService: LineaInvestigacionService | null;
  dataSource: LineaInvestigacionDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.lineaInvestigacionService = new LineaInvestigacionService(this.http)
    this.dataSource = new LineaInvestigacionDataSource(
      this.lineaInvestigacionService, this.paginator, this.sort);
  }
}

export class LineaInvestigacionDataSource extends DataSource<ILineaInvestigacion> {
  // La cantidad de problemas devueltos por github que coinciden con la consulta.
  public resultsLength = 0;
  public isLoadingResults = false;
  public isRateLimitReached = false;

  constructor(
    private lineaInvestigacionService: LineaInvestigacionService,
    private paginator: MatPaginator,
    private sort: MatSort,
  ) {
    super();
  }

  /** Función de conexión llamada por la tabla para recuperar una secuencia que contiene los datos para renderizar. */
  connect(): Observable<ILineaInvestigacion[]>{
    const displayDataChanges = [
      this.sort.sortChange,
      this.paginator.page
    ];

    // Si el usuario cambia el orden de clasificación, restablecer a la primera página.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.lineaInvestigacionService.getLineaInvestigacions(
          this.sort.active, this.sort.direction, this.paginator.pageIndex
        )
      })
      .map(data => {
        // Da vuelta la bandera para mostrar que la carga ha terminado.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.options.count;

        return data.results;
      })
      .catch(() => {
        this.isLoadingResults = false;
        // Capture si la API de Linea de investigación ha alcanzado su límite de velocidad. Devuelve datos vacíos.
        this.isRateLimitReached = true;
        return Observable.of([]);
      });
  }

  disconnect() {}
}