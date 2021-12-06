import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'app/proxy/users';
import { LocalStorageService } from '../auth/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<any> {

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    router: import("@angular/router").RouterStateSnapshot) {
    let id: string = route.params.id;

    const isProfile = router.url.includes("/users/profile")
    if (isProfile) {
      id = this.localStorageService.getUserId();
    }

    return this.userService.get(id).toPromise()
      .catch((error) => {
        console.log(error);
      })
  }

}
