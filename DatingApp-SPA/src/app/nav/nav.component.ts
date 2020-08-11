import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  // lesson 43: inject the auth service here.
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  // for user login:
  login(){
    // console.log(this.model); // if method is hooked up right, you'll see the UN and PW in the console.
    // commented out just because it was placeholder only.

    //lesson 43:
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in successfully.');
    }, error => {
      console.log('Login not successful.');
    });
  }

  // lesson 44. Note the use of localStorage and what happens to the token in it.
  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token; 
    // if something is in the token, return true.
    // if not, return false.
  }

  // lesson 44
  logout(){
    localStorage.removeItem('token');
    console.log('Successfully logged out.');
  }

  // Coding tip: "subscribe" has 5 overloaded methods.
  // When you type subscribe(), you can cycle through the 5 suggestions.
  // We picked the one that does something or else does error handling.

}
