import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';

// the following imports are stuff you created.
// sometimes you had to add them manually, other times they automatically.
// prof says sometimes just deleting and returning a char
// from your new component will add imports, fix problems.
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';


// lesson 89: using JwtModule to send our JWTs around with requests.
export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(), // prof just told use to add forRoot, dunno why.
      RouterModule.forRoot(appRoutes), // appRoutes is the constant from Routes.ts.
      JwtModule.forRoot({ // lesson 89
         config: {
            tokenGetter: tokenGetter,
            // whitelistedDomains: ['localhost:5000'], // out of date name
            // blacklistedRoutes: ['localhost:5000/api/auth'] // out of date name
            allowedDomains: ['localhost:5000'],
            disallowedRoutes: ['localhost:5000/api/auth']
         }
      }),
      TabsModule.forRoot() // lesson 92 for some html on Details page.
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
