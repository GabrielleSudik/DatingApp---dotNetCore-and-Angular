// created for lesson 53
// error handling in Ng

// alt-shift-f = prettify/format

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// the prof just knew what to type here.
// you were helped out by ctrl-dot ErrorInterceptor
// which gave you the choice to implement... something,
// and it created the start of the body.
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError(error => {
            if (error.status === 401) {
                return throwError(error.statusText);
            }
            if (error instanceof HttpErrorResponse) {
                const appliationError = error.headers.get('Application-Error');
                if (appliationError) {
                    return throwError(appliationError);
                }
                const serverError = error.error;
                let modalStateErrors = '';
                if (serverError.errors && typeof serverError.errors === 'object') {
                    for (const key in serverError.errors) {
                        if (serverError.errors[key]) {
                            modalStateErrors += serverError.errors[key] + '\n';
                        }
                    }
                }
                return throwError(modalStateErrors || serverError || 'Some random server error.');
            }
        })
    );
  }
}
// Intercept: what it does: catches any response that is not 200/300
// ie, it catches error responses.

// Note most of the code in that block was provided by the prof.
// All the if statements say what to do with specific errors.

// The error.error (and similar) refer to what you see in the browser console
// when you open the tree view for error messages - ie, open the little triangles.
// They're just how the nested levels of info are organized.

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};

// finally, add this class as a provider in app.module.ts

// Note: It's working because when you test improper things in the Register
// part of the UI, you get the correct error msgs in the console without having to 
// delve into the tree.