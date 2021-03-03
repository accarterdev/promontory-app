import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { MovieDetailedInfo } from '../shared/models/movie-detailed-info.model';
import { OmdbService } from '../shared/omdb-service/omdb.service';

import { MovieDetailModalComponent } from './movie-detail-modal.component';

let omdbServiceMock: Partial<OmdbService>;

describe('MovieDetailModalComponent', () => {
  let component: MovieDetailModalComponent;
  let omdb: OmdbService;
  let modalRef: BsModalRef;
  let fixture: ComponentFixture<MovieDetailModalComponent>;

  beforeEach(async () => {
    omdbServiceMock = {
      getMovieDetails: function () {
        return of(<MovieDetailedInfo>{});
      },
    };
    await TestBed.configureTestingModule({
      declarations: [MovieDetailModalComponent],
      providers: [
        { provide: OmdbService, useValue: omdbServiceMock },
        BsModalRef,
      ],
      imports: [HttpClientModule, ModalModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailModalComponent);
    component = fixture.componentInstance;
    omdb = TestBed.inject(OmdbService);
    modalRef = TestBed.inject(BsModalRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should not call omdb service with empty imdbID value', () => {
      component.imdbID = '';
      spyOn(omdb, 'getMovieDetails').and.callThrough();
      component.ngOnInit();
      fixture.detectChanges();
      expect(omdb.getMovieDetails).not.toHaveBeenCalled();
    });

    it('should call omdb service with provided imdbID value', () => {
      component.imdbID = '6789';
      spyOn(omdb, 'getMovieDetails').and.callThrough();
      component.ngOnInit();
      fixture.detectChanges();
      expect(omdb.getMovieDetails).toHaveBeenCalledWith('6789');
    });

    it('should toggle loading to false after calling getMovieDetails', () => {
      component.imdbID = '6789';
      spyOn(omdb, 'getMovieDetails').and.callThrough();
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.loading).toBeFalse();
    });
  });

  // describe('Modal behavior', () => {
  //   it('should call modalref.hide on close', () => {
  //     spyOn(modalRef, 'hide');
  //     component.ngOnInit();
  //     component.onClose();
  //     // fixture.detectChanges();
  //     expect(modalRef.hide).toHaveBeenCalled();
  //   });
  // });
});
