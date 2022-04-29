import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordsMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordVerification = control.get('passwordVerification')?.value;

    if (
      password === passwordVerification &&
      password !== null &&
      passwordVerification !== null
    ) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}
