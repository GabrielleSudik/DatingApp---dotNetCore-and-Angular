import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[]; // added in lesson 85 - fetching members/users for the member-list.

  constructor(private userService: UserService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { } // added in 93 for route resolver.

  ngOnInit() {
    // this.loadUsers(); // on init, call this method.
    // lesson 93: changed to loading data via the route resolver instead:

    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  // lesson 85:
  // deleted in 93.

  // loadUsers() {
  //   this.userService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
