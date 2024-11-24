import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

const URL_REGEX: RegExp = /(https?:\/\/.*\.(?:png|jpg|jpeg|bmp|svg))/;
export function urlValidator(control: AbstractControl): ValidationErrors | null {
  if (Validators.required(control)) {
    return null;
  }

  if (!URL_REGEX.test(control.value)) {
    return { invalidUrl: true };
  }

  return null;
}
