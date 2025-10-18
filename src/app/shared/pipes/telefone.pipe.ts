import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'telefone' })
export class TelefonePipe implements PipeTransform {
    transform(value: string|number): string {
        let valorFormatado = value + '';

        valorFormatado = valorFormatado
            .padStart(11, '0')                  // item 1
            .slice(0, 11)                       // item 2
            .replace(/[^0-9]/, '')              // item 3
            .replace(                           // item 4
                /(\d{2})(\d{5})(\d{4})/,
                '($1) $2-$3'
            );

        return valorFormatado;
    }
}