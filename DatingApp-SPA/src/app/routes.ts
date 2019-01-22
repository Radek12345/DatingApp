import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { AuthGuard } from './_guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import {Routes} from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}, canActivate: [AuthGuard] },
    { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}, canActivate: [AuthGuard] },
    { path: 'member/edit', component: MemberEditComponent, canActivate: [AuthGuard], canDeactivate: [PreventUnsavedChanges],
        resolve: {user: MemberEditResolver} },
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
    { path: 'lists', component: ListsComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
