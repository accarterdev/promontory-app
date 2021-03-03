import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { HeaderBarComponent } from './header-bar.component';

describe('HeaderBarComponent', () => {
  let component: HeaderBarComponent;
  let fixture: ComponentFixture<HeaderBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component methods', () => {
    it('should update movieQuery and emit new value', fakeAsync(() => {
      expect(component.movieQuery).toEqual('');
      component.onSearchFieldChange('new query');
      spyOn(component.movieSearchEmitter, 'emit');
      tick(700);
      expect(component.movieQuery).toEqual('new query');
      expect(component.movieSearchEmitter.emit).toHaveBeenCalledWith(
        'new query'
      );
    }));
  });
});
