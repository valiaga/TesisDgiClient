import { Component, OnInit } from '@angular/core';
import { UsersService } from './shared/users.service';
import { User, IUser } from './shared/user';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'dgi-users',
  template: `
  <div class="example-container mat-elevation-z8">
    <mat-table #table [dataSource]="dataSource">
      <!-- Id Column -->
      <ng-container matColumnDef="id">
        <mat-header-cell *matHeaderCellDef> No. </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.id}} </mat-cell>
      </ng-container>

      <!-- Username Column -->
      <ng-container matColumnDef="username">
        <mat-header-cell *matHeaderCellDef> Username. </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.username}} </mat-cell>
      </ng-container>

      <!-- Email Column -->
      <ng-container matColumnDef="email">
        <mat-header-cell *matHeaderCellDef> Email. </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.email}} </mat-cell>
      </ng-container>

      <!-- Url Column -->
      <!--
      <ng-container matColumnDef="url">
        <mat-header-cell *matHeaderCellDef> Url. </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.url}} </mat-cell>
      </ng-container>
      -->
      <!-- is_staff Column -->
      <ng-container matColumnDef="is_staff">
        <mat-header-cell *matHeaderCellDef> Is staff. </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.is_staff}} </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>
  <!--    <table>
        <thead>
          <tr>
            <td>Dato</td>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user | json }}</td>
          </tr>
        </tbody>
      </table>
  -->
  </div>
  `,
  styles: [],
})
export class UsersComponent implements OnInit {

  accordions: Array<any> = [
    { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
    { title: 'Dynamic Title 3', content: 'Dynamic content 3', active: true }
  ];

  public displayedColumns = [
    'id',
    // 'url',
    'username',
    'email',
    'is_staff',
    // 'groups',
  ];

  multiple = false;
  // public users: User[];
  public dataSource: any;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.usersService.getAllUsers()
      .subscribe(this.loadUsers.bind(this));
  }

  private loadUsers(res) {
    // console.log('users');
    // console.log(res);
    this.dataSource = new MatTableDataSource<IUser>(res);
  }

}
