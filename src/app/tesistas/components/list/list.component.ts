import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { ITesista } from '../../shared/tesista';

@Component({
  selector: 'dgi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Output() onDelete = new EventEmitter<string[]>();
  @Output() onUpdateTesista = new EventEmitter<string>();

  @Input() set tesistas(tesistas: ITesista[]) {
    // console.log(tesistas);
    this.dataSource = new MatTableDataSource<ITesista>(tesistas);
  }
  public dataSource: any;
  public selection = new SelectionModel<ITesista>(true, []);
  public displayedColumns = [
    'select',
    'nombres_apellidos',
    'num_doc',
    'celular',
    'genero',
    'fecha_nacimiento',
    'activo',
  ];

  constructor(
    private tdDialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
  }


  get moreOfOneSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected > 0 ? true : false;
  }

  get oneSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected === 1 ? true : false;
  }


  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  public onDeleteTesistas() {
    const tesistasSelected = (this.selection.selected).map(tesista => tesista.id);

    this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.tesista.confirmDelete, this.viewContainerRef))
      .afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.onDelete.emit(tesistasSelected);
        } else {
        }
      });
  }


  public onEditarTesista() {
    const tesistaSelected = (this.selection.selected).map(tesista => tesista.id)[0];
    this.onUpdateTesista.emit(tesistaSelected);
  }

  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
