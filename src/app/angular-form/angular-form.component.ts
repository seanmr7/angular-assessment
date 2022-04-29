import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  regExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.regExp),
      ]),
      passwordVerification: new FormControl(null, [Validators.required]),
      subscription: new FormControl(this.subscriptions[1], [
        Validators.required,
      ]),
    },
    {
      validators: CustomValidators.passwordsMatching,
    }
  );

  changeSubscription(e: any) {
    this.subscription?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.email.value);
      console.log(this.password.value);
      console.log(this.subscription.value);
    }
  }

  onReset(e: any): void {
    e.preventDefault();
    if (window.confirm('Are you sure you want to clear the form?')) {
      this.submitted = false;
      this.form.reset();
      this.form.get('subscription')?.setValue('Advanced');
    }
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
