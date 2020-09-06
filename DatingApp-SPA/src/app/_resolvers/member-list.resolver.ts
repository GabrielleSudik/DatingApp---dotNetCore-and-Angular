// lesson 93: using route resolvers to fetch data
// tbh I don't understand much of this.
// but see below "resolve" you call getUser().
// everything below that pipe is to handle errors.
// what this does: gets data before the page loads.

import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';


@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    // inject the user service, which fetches user data:
    constructor(private userService: UserService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers()
            .pipe(catchError(error => {
                this.alertify.error('Problem getting data.');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}