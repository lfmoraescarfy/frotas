import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function placaBrasilValidator(): ValidatorFn {
  const regex = /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toUpperCase();
    if (!value) return null;

    return regex.test(value)
      ? null
      : { placaInvalida: 'Placa de veículo inválida (modelos Brasil/Mercosul)' };
  };
}
