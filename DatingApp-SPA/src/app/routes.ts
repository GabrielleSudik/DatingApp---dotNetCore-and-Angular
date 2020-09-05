// created in 63: routing.

import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    // lesson 67: guarding multiple routes by creating a '' dummy and its children (ie, the real routes)
    // the empty '' just ensures that the path goes directly to, say, members or lists. ie, nothing added.
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent },
            { path: 'members/:id', component: MemberDetailComponent }, // lesson 90
                // ie, when the path ends in member/6, go to that user's MemberDetailComponent view.
            { path: 'messages', component: MessagesComponent},
            { path: 'lists', component: ListsComponent},
        ]
    },
    // { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] }, // lesson 66: route guard added.
    // { path: 'messages', component: MessagesComponent}, //moved to above
    // { path: 'lists', component: ListsComponent}, //moved to above
    { path: '**', redirectTo: '', pathMatch: 'full'} // wildcard/catchall. always keep at bottom.
];
// Ng reads from top to bottom for a match, so order is important.
