import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MovieDetailedInfo } from '../shared/models/movie-detailed-info.model';
import { OmdbService } from '../shared/omdb-service/omdb.service';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-movie-detail-modal',
  templateUrl: './movie-detail-modal.component.html',
  styleUrls: ['./movie-detail-modal.component.scss'],
})
export class MovieDetailModalComponent implements OnInit {
  @Input() imdbID: string = '';
  loading: boolean = true;
  movie: MovieDetailedInfo = <MovieDetailedInfo>{};
  constructor(private omdb: OmdbService, private modalRef: BsModalRef) {}

  ngOnInit(): void {
    if (this.imdbID) {
      this.omdb
        .getMovieDetails(this.imdbID)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe((result: MovieDetailedInfo) => {
          this.movie = result;
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.imdbID && changes.imdbID.currentValue) {
      this.omdb
        .getMovieDetails(changes.imdbID.currentValue)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe((result: MovieDetailedInfo) => {
          this.movie = result;
        });
    }
  }

  onClose(): void {
    this.modalRef.hide();
  }
}
