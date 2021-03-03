import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MenuItem } from '../shared/models/menu-item.model';
import { NavService } from '../shared/nav-service/nav.service';

import { SideNavigationComponent } from './side-navigation.component';

let navServiceMock: Partial<NavService>;
let mockNavList: MenuItem[] = [];

describe('SideNavigationComponent', () => {
  let component: SideNavigationComponent;
  let fixture: ComponentFixture<SideNavigationComponent>;
  let navService: NavService;

  beforeEach(async () => {
    mockNavList = [
      { Title: 'Menu 1', Url: '' },
      { Title: 'Menu 2', Url: '' },
    ];
    navServiceMock = {
      getNavList: function () {
        return of(mockNavList);
      },
    };
    await TestBed.configureTestingModule({
      declarations: [SideNavigationComponent],
      providers: [{ provide: NavService, useValue: navServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavigationComponent);
    component = fixture.componentInstance;
    navService = TestBed.inject(NavService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should fetch navList', () => {
      spyOn(navService, 'getNavList').and.callThrough();
      component.ngOnInit();
      expect(navService.getNavList).toHaveBeenCalled();
      expect(component.navList).toEqual(mockNavList);
    });
  });
});
