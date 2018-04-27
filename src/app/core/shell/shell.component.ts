import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
// import { viewClassName } from '@angular/compiler';
// import { BreadcrumbService } from 'ng5-breadcrumb';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TdMediaService } from '@covalent/core';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AuthService } from '../../auth/shared/auth.service';
import { UserStoreService } from '../../lib/user-store.service';

@Component({
  selector: 'dgi-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // providers: [ BreadcrumbService ]
})
export class ShellComponent implements OnInit {

  constructor(public media: TdMediaService,
    // private breadcrumbService: BreadcrumbService,
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userStoreService: UserStoreService,
    private titleService: Title) { }

  ngOnInit() {

    this.changeTitleOnNavigation();
  }

  get nameApp() {
    return 'Sistema de Tesis';
  }


  public logout() {
    this.authService.logout()
      .subscribe(this.deleteDataOfLocalStorage.bind(this));
  }

  private deleteDataOfLocalStorage(res: any) {
    this.userStoreService.logout();
  }

  /**
   * Change Title
   */
  private changeTitleOnNavigation() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        // while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }
}
