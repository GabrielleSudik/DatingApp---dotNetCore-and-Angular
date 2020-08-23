import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service'; // lesson 56

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  // lesson 43: inject the auth service here.
  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  // for user login:
  login(){
    // console.log(this.model); // if method is hooked up right, you'll see the UN and PW in the console.
    // commented out just because it was placeholder only.

    // lesson 43:
    this.authService.login(this.model).subscribe(next => {
      // console.log('Logged in successfully.');
      this.alertify.success('Logged in successfully.'); // lesson 56
    }, error => {
      // console.log('Login not successful (custom message).'); // old way, just some filler while we learned.
      // console.log(error); // lesson 53, new way, logging the error message passed from the API.
      this.alertify.error(error); // lesson 56
    });
  }

  // lesson 44. Note the use of localStorage and what happens to the token in it.
  loggedIn(){
    // const token = localStorage.getItem('token');
    // return !!token; 
    // if something is in the token, return true.
    // if not, return false.

    // lesson 57.
    // the "real" loggedIn() method is not in auth.service.ts
    // to handle JWTs
    return this.authService.loggedIn();
  }

  // lesson 44
  logout(){
    localStorage.removeItem('token');
    // console.log('Successfully logged out.');
    this.alertify.message('Successfully logged out.');
  }

  // Coding tip: "subscribe" has 5 overloaded methods.
  // When you type subscribe(), you can cycle through the 5 suggestions.
  // We picked the one that does something or else does error handling.

}
