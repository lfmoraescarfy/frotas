import { Pipe, PipeTransform } from '@angular/core';
import { PerfilEnum } from '../enums/perfil.enum';

@Pipe({ name: 'perfil' })
export class PerfilPipe implements PipeTransform {
    transform(value: number): string {
        return PerfilEnum[value];
    }
}