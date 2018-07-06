import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'dgi-button-fab',
    templateUrl: 'button-fab.component.html',
    styles: [
        `
        .button-fab{
          position: absolute;
          right: 20px;
          bottom: 20px
        }
        `
    ],
})

export class DgiButtonFabComponent implements OnInit {
    @Input() color: string; /** primary; accent, warn */
    @Input() icon: string;
    @Input() title: string;

    constructor() { }

    ngOnInit() { }
}
