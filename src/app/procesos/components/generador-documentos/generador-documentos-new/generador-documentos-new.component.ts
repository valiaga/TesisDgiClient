import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'dgi-generador-documentos-new',
    templateUrl: 'generador-documentos-new.component.html'
})

export class GeneradorDocumentosNewComponent implements OnInit {
    constructor(private dialogRef: MatDialogRef<GeneradorDocumentosNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() { }
}
