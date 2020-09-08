// lesson 97

import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  // this variable will be used below, to refresh the form after it's been saved.
  @ViewChild('editForm', {static: true}) editForm: NgForm;

  user: User;

  constructor(private route: ActivatedRoute,
              private alterify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  // when a user hits the Save Changes button on the edit page:
  updateUser(){
    console.log(this.user);
    this.alterify.success('You updated your profile!');
    // remember alertify is just the little service that displays popup notes when you do something.

    // to "reset" the form after making edits (ie, greying out the Save button, etc):
    this.editForm.reset(this.user);
  }
}
