import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'dgi-validador-new',
    templateUrl: 'validador-new.component.html'
})

export class ValidadorNewComponent implements OnInit {
    constructor(private dialogRef: MatDialogRef<ValidadorNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() { }
}
