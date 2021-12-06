import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { checkRouterChildsData } from '@core/utils/check-router-childs-data';

@Component({
  selector: 'app-smart-tv',
  templateUrl: './smart-tv.component.html',
  styleUrls: ['./smart-tv.component.scss'],
})
export class SmartTvComponent implements OnInit {
  scrollDisabled$ = this.router.events.pipe(
    filter<NavigationEnd>((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() =>
      checkRouterChildsData(
        this.router.routerState.root.snapshot,
        (data) => data.scrollDisabled
      )
    )
  );

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
