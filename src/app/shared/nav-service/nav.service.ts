import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public hideSideNav: boolean = false;
  sideNavVisibilityChange: Subject<boolean> = new Subject<boolean>();
  public isMobileView: boolean = false;
  public staticNavList: MenuItem[] = [
    { Title: 'Menu 1', Url: '' },
    { Title: 'Menu 2', Url: '' },
    { Title: 'Menu 3', Url: '' },
    { Title: 'Menu 4', Url: '' },
    { Title: 'Menu 5', Url: '' },
    { Title: 'Menu 6', Url: '' },
    { Title: 'Menu 7', Url: '' },
  ];

  constructor() {
    this.sideNavVisibilityChange.subscribe((value) => {
      this.hideSideNav = value;
    });
  }

  public toggleSideNav(): void {
    this.sideNavVisibilityChange.next(!this.hideSideNav);
  }

  public setMobileView(isMobile: boolean) {
    this.isMobileView = isMobile;
  }

  public setSideNavHidden(isVisible: boolean) {
    this.sideNavVisibilityChange.next(isVisible);
  }

  getNavList(): Observable<MenuItem[]> {
    return of(this.staticNavList);
  }
}
