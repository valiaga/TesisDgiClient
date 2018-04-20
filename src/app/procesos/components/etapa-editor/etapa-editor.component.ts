import { Component, OnInit, Input } from '@angular/core';
import { Etapa } from '../../../etapas/shared/etapa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dgi-etapa-editor',
  templateUrl: './etapa-editor.component.html',
  styleUrls: ['./etapa-editor.component.scss']
})
export class EtapaEditorComponent implements OnInit {

  public nameEtapa = '';
  public idEtapa = '';

  @Input()
  set etapa(etapa: Etapa) {
    this.buildForm();
    this.patchEtapaForm(etapa);
  }

  // tslint:disable-next-line:no-input-rename
  @Input('etapas') etapas$: Observable<Etapa[]>;

  public etapaEditorForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
  }

  public patchEtapaForm(etapa) {
    if (this.etapaEditorForm) {
      this.etapaEditorForm.patchValue({
        nombre: etapa.nombre,
        descripcion: etapa.descripcion,
        proceso: etapa.proceso,
        anterior: etapa.anterior,
        plazo_dias: etapa.plazo_dias,
        tarea_activador: etapa.tarea_activador,
        tarea_desactivador: etapa.tarea_desactivador,
        orden: etapa.orden,
      });

      this.nameEtapa = etapa.nombre;
      this.idEtapa = etapa.id;
    } else {
      // console.log('aun no esta lista');
      this.nameEtapa = '';
      this.idEtapa = '';
    }
  }

  public buildForm() {
    const controls = this.initializeControls();
    this.etapaEditorForm = this.formBuilder.group(controls);
  }

  public initializeControls() {
    const controls = {
      nombre: ['', [Validators.required]],
      descripcion: ['', []],
      proceso: ['', [Validators.required]],
      anterior: [''],
      plazo_dias: ['', []],
      tarea_activador: ['', []],
      tarea_desactivador: ['', []],
      orden: ['', [Validators.required]],
    };

    return controls;
  }
}
