import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
// import { viewClassName } from '@angular/compiler';
// import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TdMediaService } from '@covalent/core';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'dgi-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // providers: [ BreadcrumbService ]
})
export class ShellComponent implements OnInit {

  constructor(public media: TdMediaService,
            // private BreadcrumbService: BreadcrumbService,
            
            private router: Router,
            private activatedRoute: ActivatedRoute,
            private titleService: Title) { }

  ngOnInit() {

    this.changeTitleOnNavigation();
  }


  /**
   * Change Title
   */
  private changeTitleOnNavigation () {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));
    }
}
