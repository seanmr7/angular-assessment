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
    return this.users;
  }

  saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getFromLocalStorage() {
    if (localStorage.getItem('users') !== null) {
      this.users = JSON.parse(localStorage.getItem('users') || '{}');
    }
  }

  constructor() {}
}
