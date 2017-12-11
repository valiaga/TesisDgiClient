import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dgiAddCommas'
})
export class AddCommasPipe implements PipeTransform {

  transform(authors: null | string[]): any {

    if (!authors) {
      return 'Tesista Desconocido';
    }

    switch (authors.length) {
      case 0:
        return 'Tesista Desconocido';
      case 1:
        return authors[0];
      case 2:
        return authors.join(' y ');
      default:
        const ultimo = authors[authors.length - 1];
        const restante = authors.slice(0, -1);
        return `${restante.join(', ')}, y ${ultimo}`;
    }
  }

}
