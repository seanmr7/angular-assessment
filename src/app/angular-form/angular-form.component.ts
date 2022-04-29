import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from '../_helpers/custom-validators';

@Component({
  selector: 'app-angular-form',
  templateUrl: './angular-form.component.html',
  styleUrls: ['./angular-form.component.css'],
})
export class AngularFormComponent implements OnInit {
  submitted = false;
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  default = 'Advanced';

  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[^A-Za-z0-9]'),
      ]),
      passwordVerification: new FormControl(null, [Validators.required]),
      subscription: new FormControl(this.subscriptions[1], [
        Validators.required,
      ]),
    },
    { validators: CustomValidators.passwordsMatching }
  );

  changeSubscription(e: any) {
    this.subscription?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log('Submitted');
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
  get passwordVerification(): FormControl {
    return this.form.get('passwordVerification') as FormControl;
  }
  get subscription(): FormControl {
    return this.form.get('subscription') as FormControl;
  }

  constructor() {}

  ngOnInit(): void {}
}
