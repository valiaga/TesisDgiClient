import { Component, OnInit } from '@angular/core';
import { GroupsService } from './shared/groups.service';
import { Group, IGroup } from './shared/group';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'dgi-groups',
  template: `
  <div class="example-container mat-elevation-z8">
    <mat-table #table [dataSource]="dataSource">
      <!-- Id Column -->
      <ng-container matColumnDef="id">
        <mat-header-cell *matHeaderCellDef> No. </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.id}} </mat-cell>
      </ng-container>

      <!-- Username Column -->
      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef> Nombre. </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.name}} </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>
  </div>
  `,
  styles: [],
})
export class GroupsComponent implements OnInit {

  public displayedColumns = [
    'id',
    'name',
  ];

  multiple = false;
  // public users: User[];
  public dataSource: any;

  constructor(private GroupsService: GroupsService) { }

  ngOnInit() {
    this.getGroups();
  }

  private getGroups() {
    this.GroupsService.getAllGroups$()
      .subscribe(this.loadGroups.bind(this));
  }

  private loadGroups(res) {
    console.log('Groups');
    console.log(res);
    this.dataSource = new MatTableDataSource<IGroup>(res);
  }

}
