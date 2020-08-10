import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// injectable decorator is what allows injection into the service.
// we've injected stuff into components, but that is allowed by default.
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';

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
      }
    })
  );
}


}
