import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'dataHora'
})
export class DataHoraPipe implements PipeTransform {

  transform(value: Date | string | number, dateFormat: string = 'dd/MM/yyyy HH:mm'): string {
    if (!value) {
      return '';
    }

    try {
      const date = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value;
      return format(date, dateFormat);
    } catch (error) {
      console.error('DataHoraPipe: Valor de data inválido', value);
      return '';
    }
  }
}