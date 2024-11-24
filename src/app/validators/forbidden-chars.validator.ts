import { AbstractControl, ValidationErrors } from '@angular/forms';

const FORBIDDEN_CHARS: RegExp = /^[^<>%$&]*$/;

export function forbiddenCharsValidator(control: AbstractControl): ValidationErrors | null {
  if (!FORBIDDEN_CHARS.test(control.value)) {
    return { forbiddenChars: true };
  }

  return null;
}
