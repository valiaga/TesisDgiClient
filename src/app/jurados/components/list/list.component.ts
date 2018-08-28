import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Jurado } from '../../shared/jurado';

@Component({
  selector: 'dgi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Output() onUpdateJurado = new EventEmitter<string>();
  @Output() onDeleteJurado = new EventEmitter<string>();
  @Output() onGetProyectos = new EventEmitter<string>();

  @Input() jurados: Jurado[];

  constructor() { }

  ngOnInit() {
  }

}
