import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-output-table',
  templateUrl: './output-table.component.html',
  styleUrls: ['./output-table.component.css'],
})
export class OutputTableComponent implements OnInit {
  users: User[] = [];

  getUsers(): void {
    this.users = this.userService.getUsers();
  }

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }
}
