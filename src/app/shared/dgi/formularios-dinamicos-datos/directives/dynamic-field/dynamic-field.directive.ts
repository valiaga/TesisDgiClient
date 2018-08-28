import { Directive, ComponentRef, Input, Type, OnInit, OnChanges, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';


import { Field } from '../../models/field';
import { FieldConfig } from '../../models/field-config';
import {
  DgiFormButtonSubmitComponent,
  DgiFormInputComponent, DgiFormNumberComponent,
  DgiFormSelectComponent, DgiFormEmailComponent,
  DgiFormPasswordComponent, DgiFormRadioComponent,
  DgiFormTelComponent, DgiFormTextareaComponent,
  DgiFormSlideToggleComponent, DgiFormDatepickerComponent,
  DgiFormCheckboxComponent, DgiFormFileInputComponent,
  DgiFormGenerarDocumentosComponent, DgiFormValidadorComponent,
} from '../../components';

const components: { [type: string]: Type<Field> } = {
  buttonSubmit: DgiFormButtonSubmitComponent,
  input: DgiFormInputComponent,
  number: DgiFormNumberComponent,
  select: DgiFormSelectComponent,
  email: DgiFormEmailComponent,
  tel: DgiFormTelComponent,
  textarea: DgiFormTextareaComponent,
  slideToggle: DgiFormSlideToggleComponent,
  password: DgiFormPasswordComponent,
  date: DgiFormDatepickerComponent, /** datepicker */
  radio: DgiFormRadioComponent,
  checkbox: DgiFormCheckboxComponent,
  fileinput: DgiFormFileInputComponent,

  validador: DgiFormValidadorComponent,
  generar_documentos: DgiFormGenerarDocumentosComponent,
};


@Directive({
  selector: '[dgiDynamicField]',
})
export class DgiDynamicFieldDirective implements Field, OnChanges, OnInit {

  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;

  private component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Esta intentando usar un tipo no compatible (${this.config.type}).
        Tipos soportados: ${supportedTypes}`,
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
