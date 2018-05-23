import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'dgi-campos-new',
    templateUrl: 'campos-new.component.html',
})

export class CamposNewComponent implements OnInit {
    public tipoCampo = new FormControl();
    public tiposDeCampos: any[];

    constructor() { }

    ngOnInit() {
        this.loadTipoDeCampos();
    }
    public loadTipoDeCampos() {
        this.tiposDeCampos = [
            {
                name: 'Simples',
                pokemon: [
                    { value: 'input', viewValue: 'Input' },
                    { value: 'number', viewValue: 'Number' },
                    { value: 'select', viewValue: 'Select' },
                    { value: 'email', viewValue: 'Email' },
                    { value: 'tel', viewValue: 'Teléfono' },
                    { value: 'textarea', viewValue: 'Textarea' },
                    { value: 'slideToggle', viewValue: 'SlideToggle' },
                    { value: 'password', viewValue: 'Password' },
                    { value: 'radio', viewValue: 'Radio' },
                    { value: 'checkbox', viewValue: 'Checkbox' },
                ]
            },
            {
                name: 'Complejo',
                pokemon: [
                    { value: 'datepicker', viewValue: 'Datepicker' },
                ]
            },
            {
                name: 'Botones',
                pokemon: [
                    { value: 'buttonSubmit', viewValue: 'Botón submit' },
                ]
            },
        ];
    }
}
