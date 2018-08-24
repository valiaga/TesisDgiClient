import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
    selector: 'dgi-form-file-input',
    templateUrl: 'form-file-input.component.html',
    styleUrls: ['form-file-input.component.scss']
})

export class DgiFormFileInputComponent implements OnInit {
    public config: FieldConfig;
    public group: FormGroup;
    public onUpdate = new EventEmitter<any>();

    public disabled = false;
    public files: File | FileList;

    constructor(private formWidthToolsService: FormWidthToolsService) { }

    ngOnInit() {

    }

    public update(field: FieldConfig) {
        const dataReturn = { id: field.id, type: field.type };
        return this.onUpdate.emit(dataReturn);
    }

    public getWidthControlClass() {
        return this.formWidthToolsService.getWidthControlClass(this.config);
    }

    // toggleDisabled(): void {
    //     this.disabled = !this.disabled;
    // }

    get textButton() {
        let cantidad = '';
        let nombre = '';
        cantidad = this.config.multiple_fileinput ? ' multiples' : ' un';
        nombre = this.config.multiple_fileinput ? ' archivos' : ' archivo';

        return 'Escoge' + cantidad + nombre;
    }

    get textPlaceholder() {
        const extenciones = this.config.accept_fileinput ? ` (${this.config.accept_fileinput})` : '';
        return `${this.config.label}${extenciones}`;
    }
}
