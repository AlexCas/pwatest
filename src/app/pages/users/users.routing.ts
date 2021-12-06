import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UsersResolverService } from './users-resolver.service';
import { UsersComponent } from './users.component';

export const usersRoutes: Routes = [
  {
    path: "",
    component: UsersComponent
  }, {
    path: "add",
    component: UserComponent
  }, {
    path: "edit/:id",
    component: UserComponent,
    resolve: {
      itemData: UsersResolverService
    }
  },
  {
    path: "profile",
    component: UserComponent,
    resolve: {
      itemData: UsersResolverService
    }
  },
];
