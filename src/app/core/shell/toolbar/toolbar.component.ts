import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dgi-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() isSidenavOpened: boolean;
  @Output() stateSidenavOpened =  new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  public sidenavToggle(){
    // this.stateSidenavOpened.emit(!this.isSidenavOpened)
  }

}
