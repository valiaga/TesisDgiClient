import { Component, OnInit, Input } from '@angular/core';
import { Perfil, IPerfil } from '../../shared/perfil';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'dgi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() set perfiles(perfiles: IPerfil[]) {
    this.dataSource = new MatTableDataSource<IPerfil>(perfiles);
  }
  public dataSource: any;
  public selection = new SelectionModel<IPerfil>(true, []);

  public displayedColumns = [
    // 'id',
    'select',
    'username',
    'email',
    'is_staff',
    'nombres',
    'num_doc',
    'fecha_nacimiento',
  ];

  constructor() { }

  ngOnInit() {
  }


  get moreOfOneSelected() {
    const numSelected = this.selection.selected.length;
    console.log(numSelected);
    return numSelected > 0 ? true : false;
  }


  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
