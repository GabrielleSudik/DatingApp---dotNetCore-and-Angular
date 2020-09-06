import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';


// lesson 90: to get user details
// need to fetch their data from the API

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUser() // call this method when this component is called.
    // later, lesson 93: instead of directly loadUser,
    // use the resolver to load the data into the route:
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  // when a user clicks on a Details button
  // the URL will end in members/5 (or whatever id)
  // we need this method to get and pass that id.
  // route is needed because that's where it will fetch the id from.
  // later: commented out in lesson 93, to do what we added to onInit instead.

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params.id)
  //   .subscribe((user: User) => {
  //   this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  //   // note the + in GetUser param converts a string from the URL to an int for the method.
  // }
}
