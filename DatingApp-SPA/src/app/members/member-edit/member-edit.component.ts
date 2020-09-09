// lesson 97

import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  // this variable will be used below, to refresh the form after it's been saved.
  @ViewChild('editForm', {static: true}) editForm: NgForm;

  user: User;

  // lesson 100: so the app can watch for users closing it with unsaved data.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private alterify: AlertifyService,
              private userService: UserService,
              private authService: AuthService) { }
              // lesson 102: bring in UserService so updateUser() will talk to that file.
              // and AuthService because this component will have to pass on the token to check.

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  // when a user hits the Save Changes button on the edit page:
  updateUser(){

    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(next => {

      this.alterify.success('You updated your profile!');
      // remember alertify is just the little service that displays popup notes when you do something.

      // to "reset" the form after making edits (ie, greying out the Save button, etc):
      this.editForm.reset(this.user);

    }, error => {
      this.alterify.error(error);
    });
  }
}
