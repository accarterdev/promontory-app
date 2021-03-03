import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { MovieDetailModalComponent } from '../movie-detail-modal/movie-detail-modal.component';

import { MovieResultCardComponent } from './movie-result-card.component';

describe('MovieResultCardComponent', () => {
  let component: MovieResultCardComponent;
  let fixture: ComponentFixture<MovieResultCardComponent>;
  let modalRef: BsModalRef;
  let modalService: BsModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [BsModalService],
      imports: [ModalModule.forRoot()],
      declarations: [MovieResultCardComponent, MovieDetailModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
