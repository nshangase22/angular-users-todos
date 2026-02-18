import { Routes } from '@angular/router';
import { UsersComponent } from './features/users/users.component';
import { UserDetailComponent } from './features/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'users/:id', component: UserDetailComponent }
];
