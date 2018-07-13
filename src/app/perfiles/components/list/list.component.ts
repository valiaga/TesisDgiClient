import { Component, OnInit, Input } from '@angular/core';
import { Perfil } from '../../shared/perfil';

@Component({
  selector: 'dgi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() perfiles: Perfil[];

  constructor() { }

  ngOnInit() {
  }

}
