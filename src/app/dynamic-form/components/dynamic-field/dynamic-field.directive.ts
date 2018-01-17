import { Directive, ComponentRef, Input, Type, OnInit, OnChanges, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormButtonSubmitComponent } from '../form-button-submit/form-button-submit.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormSelectComponent } from '../form-select/form-select.component';

import { Field } from '../../models/field';
import { FieldConfig } from '../../models/field-config';
import { FormEmailComponent } from '../form-email/form-email.component';
import { FormNumberComponent } from '../form-number/form-number.component';
import { FormTelComponent } from '../form-tel/form-tel.component';

const components: {[type: string]: Type<Field>} = {
  buttonSubmit: FormButtonSubmitComponent,
  input: FormInputComponent,
  number: FormNumberComponent,
  select: FormSelectComponent,
  email: FormEmailComponent,
  tel: FormTelComponent,
};


@Directive({
  selector: '[dgiDynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {

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
        Tipos soportados: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;

  }
}
