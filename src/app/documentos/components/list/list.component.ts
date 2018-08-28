import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { IDocumento } from '../../shared/documento';

@Component({
  selector: 'dgi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Output() onDelete = new EventEmitter<string[]>();
  @Output() onUpdateDocumento = new EventEmitter<string>();

  @Input() set documentos(documentos: IDocumento[]) {
    // console.log(documentos);
    this.dataSource = new MatTableDataSource<IDocumento>(documentos);
  }
  public dataSource: any;
  public selection = new SelectionModel<IDocumento>(true, []);
  public displayedColumns = [
    'select',
    'nombre',
    'alias',
    'llave_documento',
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

  public onDeleteDocumentos() {
    const documentosSelected = (this.selection.selected).map(documento => documento.id);

    this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.documento.confirmDelete, this.viewContainerRef))
      .afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.onDelete.emit(documentosSelected);
        } else {
        }
      });
  }


  public onEditarDocumento() {
    const documentoSelected = (this.selection.selected).map(documento => documento.id)[0];
    this.onUpdateDocumento.emit(documentoSelected);
  }

  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
