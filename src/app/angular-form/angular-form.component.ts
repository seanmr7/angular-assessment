import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../models/user';

@Component({
  selector: 'app-angular-form',
  templateUrl: './angular-form.component.html',
  styleUrls: ['./angular-form.component.css'],
})
export class AngularFormComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: [
      '',
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('[^A-Za-z0-9]'),
    ],
    passwordVerification: ['', Validators.required],
  });

  submitted = false;

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

  constructor(private formBuilder: FormBuilder) {}

  // subscriptions = ['Basic', 'Advanced', 'Pro'];

  // userForm = this.formBuilder.group({
  //   email: '',
  // });

  // onSubmit() {
  //   console.log('Form submitted');
  // }

  ngOnInit(): void {}
}
