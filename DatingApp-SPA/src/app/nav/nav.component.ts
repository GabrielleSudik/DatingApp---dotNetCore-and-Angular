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

  // Coding tip: "subscribe" has 5 overloaded methods.
  // When you type subscribe(), you can cycle through the 5 suggestions.
  // We picked the one that does something or else does error handling.

}
