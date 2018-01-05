import { Injectable } from '@angular/core';
import { CampoBase } from '../models/campo-base';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable()
export class ControlService {

  constructor() { }

  toFormGroup(campos: CampoBase<any>[]){
    let group: any = {};

    campos.forEach(campo => {
      // console.log('campo', campo.key)
      // console.log(campo)
      group[campo.key] = new FormControl(campo.value || '', getValidators(campo))
    });
    return new FormGroup(group);
  }
}

export function getValidators(campo){
  let myValidator: any[]=[]

  if(campo.required){
    myValidator.push(Validators.required)
  }
  // console.log('campo.label')
  // console.log(campo.key)
  // console.log(campo.max)
  
  if(campo.max){
    myValidator.push(Validators.maxLength(campo.max))
  }
  if(campo.min){
    myValidator.push(Validators.minLength(campo.min))
  }

  switch (campo.type) {
    case "email":
      myValidator.push(Validators.email)
      // myValidator.push(Validators.pattern(EMAIL_REGEX))
      break;
    
    default:
      break;
  }

  return myValidator;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;