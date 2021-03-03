import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../shared/models/menu-item.model';
import { NavService } from '../shared/nav-service/nav.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit {
  navList: MenuItem[] = [];

  get isSideNavHidden(): boolean {
    return this.navService.hideSideNav;
  }
  constructor(public navService: NavService) {}

  ngOnInit(): void {
    this.navService.getNavList().subscribe((results: MenuItem[]) => {
      this.navList = results;
    });
  }
}
