import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dictaminador } from '../../shared/dictaminador';

@Component({
  selector: 'dgi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Output() onUpdateDictaminador = new EventEmitter<string>();
  @Output() onDeleteDictaminador = new EventEmitter<string>();
  @Output() onGetProyectos = new EventEmitter<string>();

  @Input() dictaminadores: Dictaminador[];

  constructor() { }

  ngOnInit() {
  }

}
