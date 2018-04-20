import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dgi-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.scss']
})
export class EtapaComponent implements OnInit {
  public etapaForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<EtapaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm() {
    const controls = this.initializeControls();
    this.etapaForm = this.formBuilder.group(controls);
  }

  public initializeControls() {
    const controls = {
      nombre: ['', [Validators.required]],
      descripcion: ['', []],
      proceso: [this.data.procesoId, [Validators.required]],
      anterior: ['', [Validators.required]],
      plazo_dias: [0, []],
      tarea_activador: ['', []],
      tarea_desactivador: ['', []],
      orden: ['', [Validators.required]],
    };

    return controls;
  }

}
