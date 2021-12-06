import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/pages/auth/services/auth.service';
import { LocalStorageService } from 'app/pages/auth/services/local-storage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit, OnDestroy {

  isOpen: boolean;
  user: any;
  // Private
  private unsubscribeAll: Subject<any>;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();
    this.user = this.authService.getUser();
    console.log("constructor", this.user)
  }

  ngOnInit() {
    this.localStorageService.user$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((user) => {
        if (user) {
          this.user = user;
          console.log("ngOnInit", this.user)
        }
      });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logOut() {
    this.authService.logOut()
  }

  /**
  * On destroy
  */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
