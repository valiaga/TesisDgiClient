import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Persona } from '../../shared/persona';

@Component({
  selector: 'dgi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Output() onUpdatePersona = new EventEmitter<string>();
  @Output() onDeletePersona = new EventEmitter<string>();
  @Output() onGetProyectos = new EventEmitter<string>();

  @Input() personas: Persona[];

  constructor() { }

  ngOnInit() {
  }

}
