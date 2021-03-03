import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { MovieDetailModalComponent } from '../movie-detail-modal/movie-detail-modal.component';
import { MovieResult } from '../shared/models/movie-result.model';

@Component({
  selector: 'app-movie-result-card',
  templateUrl: './movie-result-card.component.html',
  styleUrls: ['./movie-result-card.component.scss'],
})
export class MovieResultCardComponent implements OnInit {
  @Input() movieResult: MovieResult = <MovieResult>{};
  modalRef: BsModalRef = new BsModalRef();
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openMovieDetails(): void {
    this.movieResult &&
      this.modalService.show(MovieDetailModalComponent, {
        initialState: { imdbID: this.movieResult.imdbID },
        animated: true,
        class: 'modal-lg',
      });
  }
}
