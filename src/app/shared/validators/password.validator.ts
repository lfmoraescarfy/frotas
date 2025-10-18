import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class PasswordValidator {
    static match(matchTo: string) : (control: AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => {
            const parent = control.parent;

            if (!parent || !(parent instanceof FormGroup) || !parent.controls[matchTo]) {
                return { isMatching: false };
            }

            const isMatching = control.value === parent.controls[matchTo].value;

            return isMatching ? null : { notMatching: true };
        }
    };
}