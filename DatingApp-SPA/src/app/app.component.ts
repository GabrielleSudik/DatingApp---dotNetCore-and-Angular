import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service'; // lesson 58
import { JwtHelperService } from '@auth0/angular-jwt'; // lesson 58


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Udemy Core and Angular Dating App';
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  // lesson 58 added.
  // OnInit doesn't populate with boilerplate app.component.ts
  // But we want our app to always fetch the token in localStorage
  // when it starts, so we need an OnInit.
  // So long as there is a token in localStorage,
  // this will pass it to our authService.
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
