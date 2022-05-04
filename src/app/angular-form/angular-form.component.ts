import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from '../_helpers/custom-validators';
import { User } from '../models/user';
import { UserService } from '../user.service';

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
  regExpCapital = /^[A-Z].*$/;

  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.regExp),
        Validators.pattern(this.regExpCapital),
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
      const formData = {
        email: this.email.value,
        password: this.password.value,
        subscription: this.subscription.value,
        subscriptionStart: new Date(Date.now()),
      };

      // Convert form data to JSON and download file
      const jsonFormData = JSON.stringify(formData);
      let file = new Blob([jsonFormData], { type: 'application/json' });
      let a = document.createElement('a');
      let url = URL.createObjectURL(file);
      a.href = url;
      a.download = jsonFormData;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);

      // Save form data to users.ts for output table.
      const newUser = new User(
        formData.email,
        formData.subscription,
        formData.password,
        formData.subscriptionStart
      );

      this.userService.addUser(newUser);
      this.userService.saveToLocalStorage();

      this.form.reset();
      this.submitted = false;
    }
  }

  onReset(e: any): void {
    e.preventDefault();
    if (this.form.touched) {
      if (window.confirm('Are you sure you want to clear the form?')) {
        this.submitted = false;
        this.form.reset();
        this.form.get('subscription')?.setValue('Advanced');
      }
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

  constructor(public userService: UserService) {}

  ngOnInit(): void {}
}
