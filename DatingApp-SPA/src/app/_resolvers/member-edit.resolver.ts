// lesson 97:
// will get member data for the member-edit component.
// copied from MemberDetailResolver, with some changes.

import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MemberEditResolver implements Resolve<User> {

    // inject the user service, which fetches user data:
    constructor(private userService: UserService,
                private router: Router,
                private alertify: AlertifyService,
                private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        // this will get the user's data based on logged in user's id associated with the token.
        return this.userService.getUser(this.authService.decodedToken.nameid)
            .pipe(catchError(error => {
                this.alertify.error('Problem getting your data.');
                this.router.navigate(['/members']);
                return of(null);
            })
        )
    }
}