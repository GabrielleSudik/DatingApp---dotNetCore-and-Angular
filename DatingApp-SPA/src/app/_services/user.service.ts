// created in lesson 84
// we will query the API from this service.

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// Recall how a user must be authorized to get info on other users.
// So they have to have a token.
// This const will ID the logged in user's token,
// and pass it along in the headers in the methods below.
// If you hover on the .get below, you'll see the get methods
// can take optional parameters, including headers.
// That's where we send this info.

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

// lesson 89: we removed httpOptions, incl as args below,
// because we set up a universal way of handling tokens in app.module.ts with JwtModule

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // we COULD hardcode our baseUrl here (the API's localhost address)
  // instead, check out environment.ts where we added it as a more universal item.
  // Why this way? Eventually we will publish the app, and we can just update
  // the address in the environment.prod.ts.
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  // So I guess... "Observable" is like a generic type. Like List<User>.
  // It's just something specific to Ng (or maybe TS/JS?).

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
    // see how we are building the URL for the user we need, and getting that user based on the URL?
  }
}
