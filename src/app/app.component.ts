import { Component, OnInit } from '@angular/core';
import { MovieResult } from './shared/models/movie-result.model';
import { OmdbService } from './shared/omdb-service/omdb.service';
import { finalize, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OmdbResult } from './shared/models/omdb-result.model';
import { NavService } from './shared/nav-service/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'Movie Search';
  defaultSearch: string = 'Coach';
  searchError: string = '';
  loading: boolean = true;
  windowDesktopSize: number = 991;
  movieResults: MovieResult[] = [];
  constructor(private ombd: OmdbService, public navService: NavService) {}

  ngOnInit(): void {
    this.handleMobileTransition();
    window.onresize = () => this.handleMobileTransition();
    this.defaultSearch && this.getMovies(this.defaultSearch);
  }

  getMovies(movieQuery: string): void {
    this.loading = true;
    this.ombd
      .getMoviesByTitle(movieQuery)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (results: OmdbResult) => {
          if (results) {
            this.handleSearchResults(results);
          } else {
            this.handleError();
          }
        },
        (err) => {
          this.handleError(err && err.error);
        }
      );
  }

  handleSearchResults(results: OmdbResult): void {
    if (results.Response && results.Response.toLowerCase() == 'true') {
      this.searchError = '';
      this.movieResults = results.Search;
    } else if (results.Response && results.Response.toLowerCase() == 'false') {
      this.handleError(results.Error);
    }
  }

  handleError(errorMsg?: string): void {
    this.searchError = errorMsg || 'Something went wrong. Please try again.';
  }

  onMovieSearch(movieQuery: string): void {
    if (movieQuery) {
      this.getMovies(movieQuery);
    }
  }

  handleMobileTransition() {
    if (window.innerWidth <= this.windowDesktopSize) {
      this.navService.setSideNavHidden(true);
      this.navService.setMobileView(true);
    } else {
      this.navService.setSideNavHidden(false);
      this.navService.setMobileView(false);
    }
  }
}
