import { IcuPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { TestBed } from '@angular/core/testing';
import { MenuItem } from '../models/menu-item.model';

import { NavService } from './nav.service';

describe('NavService', () => {
  let service: NavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('service methods', () => {
    it('should toggle hideSideNav', () => {
      service.hideSideNav = true;
      service.toggleSideNav();
      expect(service.hideSideNav).toBeFalse();
      service.toggleSideNav();
      expect(service.hideSideNav).toBeTrue();
    });

    it('should manually set hideSideNav', () => {
      service.hideSideNav = true;
      service.setSideNavHidden(false);
      expect(service.hideSideNav).toBeFalse();
    });

    it('should manually set isMobileView', () => {
      service.isMobileView = true;
      service.setMobileView(false);
      expect(service.isMobileView).toBeFalse();
    });

    it('should fetch Navigation List', () => {
      const mockNavList: MenuItem[] = [
        { Title: 'Menu 1', Url: '' },
        { Title: 'Menu 2', Url: '' },
      ];
      service.staticNavList = mockNavList;
      service.getNavList().subscribe((results) => {
        expect(results.length).toEqual(2);
        expect(results).toEqual(mockNavList);
      });
    });
  });
});
