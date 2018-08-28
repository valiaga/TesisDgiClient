import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Asesor } from '../../shared/asesor';

@Component({
  selector: 'dgi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Output() onUpdateAsesor = new EventEmitter<string>();
  @Output() onDeleteAsesor = new EventEmitter<string>();
  @Output() onGetProyectos = new EventEmitter<string>();

  @Input() asesores: Asesor[];

  constructor() { }

  ngOnInit() {
  }

}
