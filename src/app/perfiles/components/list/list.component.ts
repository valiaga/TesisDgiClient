import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { IPerfil } from '../../shared/perfil';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';

@Component({
  selector: 'dgi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Output() onDelete = new EventEmitter<string[]>();

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

  constructor(
    private tdDialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
  }


  get moreOfOneSelected() {
    const numSelected = this.selection.selected.length;
    // console.log(numSelected);
    return numSelected > 0 ? true : false;
  }


  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  public onDeletePerfiles() {
    const perfilesSelected = (this.selection.selected).map(perfil => perfil.id);

    this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.perfil.confirmDelete, this.viewContainerRef))
      .afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          // console.log(perfilesSelected);
          this.onDelete.emit(perfilesSelected);
        } else {
        }
      });
  }

  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
