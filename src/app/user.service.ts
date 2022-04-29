import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  getUsers() {
    this.getFromLocalStorage();
    console.log(this.users);
    return this.users;
  }

  saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getFromLocalStorage() {
    if (localStorage.getItem('users') !== null) {
      console.log(JSON.parse(localStorage.getItem('users') || '{}'));
      this.users = JSON.parse(localStorage.getItem('users') || '{}');
    }
  }

  constructor() {}
}
