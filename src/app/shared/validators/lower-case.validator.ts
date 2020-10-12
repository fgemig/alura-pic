import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl): object {

  const pattern = /^[a-z0-9_\-]+$/;

  if (control.value.trim() && !pattern.test(control.value)) {
    return { lowerCase: true };
  }

  return null;
}
