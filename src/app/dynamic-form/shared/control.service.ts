import { Injectable } from '@angular/core';
import { CampoBase } from '../models/campo-base';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable()
export class ControlService {

  constructor() { }

  toFormGroup(campos: CampoBase<any>[]){
    let group: any = {};

    campos.forEach(campo => {

      let formControl = new FormControl([''], mapValidators(campo));
      formControl.setValue(campo.value)
      group[campo.key] = formControl;
      // group[campo.key] = new FormControl([campo.value || ''], mapValidators(campo));
    });
    return new FormGroup(group);
  }
}

export function mapValidators(campo){
  const formValidator: any[]=[]

  // if(validators) {}

  if(campo.required){
    formValidator.push(Validators.required)
  }
  
  if(campo.maxLength){
    formValidator.push(Validators.maxLength(campo.maxLength))
  }
  if(campo.minLength){
    formValidator.push(Validators.minLength(campo.minLength))
  }

  if(campo.max){
    formValidator.push(Validators.max(campo.max))
  }
  if(campo.min){
    formValidator.push(Validators.min(campo.min))
  }

  switch (campo.type) {
    case "email":
      formValidator.push(Validators.email)
      // formValidator.push(Validators.pattern(EMAIL_REGEX))
      break;
    
    default:
      break;
  }

  return formValidator;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;