import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ILineaInvestigacion } from '../shared/linea-investigacion';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'dgi-linea-investigacion-list',
  template: `
  <div class="example-container mat-elevation-z8">
  
    <mat-table #table [dataSource]="dataSource" matSort>
  
      <!--- Note that these columns can be defined in any order.
            The actual rendered columns are set as a property on the row definition" -->
  
      <!-- Checkbox Column -->
      <ng-container matColumnDef="select">
        <mat-header-cell *matHeaderCellDef>
          <!-- <mat-checkbox (change)="$event ? masterToggle() : null"
                       [checked]="isAllSelected()"
                       [indeterminate]="selection.hasValue() && !isAllSelected()">
          </mat-checkbox> -->
        </mat-header-cell>
        <mat-cell *matCellDef="let row">
          <!-- <mat-checkbox (click)="$event.stopPropagation()"
                       (change)="$event ? selection.toggle(row.id) : null"
                       [checked]="selection.isSelected(row.id)">
          </mat-checkbox> -->
        </mat-cell>
      </ng-container>
  
      <!-- ID Column -->
      <ng-container matColumnDef="userId">
        <mat-header-cell *matHeaderCellDef mat-sort-header> ID </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.id}} </mat-cell>
      </ng-container>
  
      <!-- Progress Column -->
      <ng-container matColumnDef="progress">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Progress </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.progress}}% </mat-cell>
      </ng-container>
  
      <!-- Name Column -->
      <ng-container matColumnDef="userName">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Name </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.name}} </mat-cell>
      </ng-container>
  
      <!-- Color Column -->
      <ng-container matColumnDef="color">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Color </mat-header-cell>
        <mat-cell *matCellDef="let row" [style.color]="row.color"> {{row.color}} </mat-cell>
      </ng-container>
  
      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"
              [class.example-selected-row]="selection.isSelected(row.id)"
              (click)="selection.toggle(row.id)">
      </mat-row>
    </mat-table>
  
    <div class="example-no-results"
         [style.display]="dataSource.renderedData.length == 0 ? '' : 'none'">
      No users found matching filter.
    </div>
  
    <mat-paginator #paginator
                  [length]="dataSource.filteredData.length"
                  [pageIndex]="0"
                  [pageSize]="25"
                  [pageSizeOptions]="[5, 10, 25, 100]">
    </mat-paginator>
  </div>
  `,
  styles: []
})
export class LineaInvestigacionListComponent implements OnInit {

  dataSource: any | null;

  constructor() { }

  ngOnInit() {
  }

}

/** Las constantes solían llenar nuestra base de datos.  */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NOMBRES = ['software', 'procesos', 'gestion de TI', 'Seguridad', 'Redes', 'IA',
'Calidad', 'psicologia educativa', 'psicologia Clinica', 'psicologia forence',
'psicologia Politica', 'Medicina General',
'Medicina Publica', 'Ing Civil A', 'Ing Civil B', 'Ing Ambiental A', 'Ing Ambiental B', 
'Arquitectira A', 'Arquitectira B'];


export class LineaInvestigacionDataBase {
  dataChange: BehaviorSubject<ILineaInvestigacion[]> = new BehaviorSubject<ILineaInvestigacion[]>([]);
  
  get data(): ILineaInvestigacion[] { return this.dataChange.value; }

  constructor() {
    for (let i = 0; i < 100; i++) { this.addLineaInvestigacion(); }
  }

  /** Agrega un nuevo usuario a la base de datos. */
  addLineaInvestigacion() {
    const copiedData = this.data.slice();
    console.log('copiedData');
    console.log(copiedData);
    copiedData.push(this.createNewLineaInvestigacion());
    this.dataChange.next(copiedData);
  }

  /** Crea y devuelve un nuevo usuario. */
  private createNewLineaInvestigacion() {
    const nombre = 
        NOMBRES[Math.round(Math.random() * (NOMBRES.length - 1))] + ' ' +
        NOMBRES[Math.round(Math.random() * (NOMBRES.length - 1))].charAt(0) + ' ';
    
    return {
      id: (this.data.length + 1).toString(),
      nombre: nombre,
      descripcion: 'desc',
      activo: true,
      escuela: '1',
      fecha_creacion: '',
      fecha_actualizacion: ''
    }
  }
}

export class LineaInvestigacionDataSource extends DataSource<any> {
  constructor(private _paginator: MatPaginator) {
    super()
  }

  connect(): Observable<ILineaInvestigacion[]>{

    const displayDataChanges = [
      this.
    ]

    return Observable.merge()
  }

  disconnect() {}
}