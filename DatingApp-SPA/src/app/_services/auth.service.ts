import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

// injectable decorator is what allows injection into the service.
// we've injected stuff into components, but that is allowed by default.
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

constructor(private http: HttpClient) { }

// lessons 42-43. login method. Gab, the prof's kinda flying through
// this whole part, but the gist of it is it's connecting
// the UN and PW fields to the API and token.
login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token); // lesson 58.
          // it just... decodes the token (to reveal username, eg.)
        console.log(this.decodedToken); // just so we can see that it works.
      }
    })
  );
}

// lesson 48
// the model arg will be a UN and PW.
register(model: any){
  return this.http.post(this.baseUrl + 'register', model);
  // tip: hover on "post" to see what it does.
  // it returns an observable, so we need to actually observe that somewhere.
  // head to register.component.ts
}

// lesson 57
// creating a loggedIn() method that the nav loggedIn() will call
// to use JWTs.
loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token); // checks if token is expired or missing or has a problem
    // and returns the opposite (ie, we want true when everything is just fine.)
}

}
