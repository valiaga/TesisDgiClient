import { Component, OnInit, Input } from '@angular/core';
import { Perfil, IPerfil } from '../../shared/perfil';
import { MatTableDataSource } from '@angular/material';

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

  public displayedColumns = [
    // 'id',
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

}
