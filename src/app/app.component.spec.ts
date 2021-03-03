import { HttpClientModule } from '@angular/common/http';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ResultsViewComponent } from './results-view/results-view.component';
import { MovieDetailedInfo } from './shared/models/movie-detailed-info.model';
import { OmdbResult } from './shared/models/omdb-result.model';
import { OmdbService } from './shared/omdb-service/omdb.service';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';

let omdbServiceMock: Partial<OmdbService>;

describe('AppComponent', () => {
  let component: AppComponent;
  let omdb: OmdbService;

  beforeEach(async () => {
    omdbServiceMock = {
      getMoviesByTitle: function () {
        return of(<OmdbResult>{});
      },
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [OmdbService],
      declarations: [
        AppComponent,
        ResultsViewComponent,
        SideNavigationComponent,
        HeaderBarComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Movie Search'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Movie Search');
  });

  it(`should have as defaultSearch 'Coach'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.defaultSearch).toEqual('Coach');
  });

  describe('OnInit', () => {
    it('should call getMovies with default search query', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(app, 'getMovies');
      app.defaultSearch = 'good';
      app.ngOnInit();
      expect(app.getMovies).toHaveBeenCalledWith('good');
    });

    it('should not call getMovies without a default search query', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(app, 'getMovies');
      app.defaultSearch = '';
      app.ngOnInit();
      expect(app.getMovies).not.toHaveBeenCalled();
    });
  });

  describe('component methods', () => {
    let mockSuccessResults: OmdbResult = <OmdbResult>{};
    let mockFailureResults: OmdbResult = <OmdbResult>{};
    beforeEach(() => {
      mockSuccessResults = {
        Search: [
          {
            Title: 'Coach Carter',
            Year: '2005',
            imdbID: 'tt0393162',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BNWYxZWFiNTItN2FkNS00ZDJmLWE1MWItYjMyMTgyOTI4MmQ4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
          },
          {
            Title: 'Coach',
            Year: '1989–1997',
            imdbID: 'tt0096560',
            Type: 'series',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BMTI5NTU5NDY4M15BMl5BanBnXkFtZTcwNzM2MTM1MQ@@._V1_SX300.jpg',
          },
        ],
        totalResults: '234',
        Response: 'True',
      };
      mockFailureResults = {
        Response: 'False',
        Error: 'Mock error',
        Search: [],
        totalResults: '0',
      };
    });

    it('should clear search error and set movie results', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.handleSearchResults(mockSuccessResults);
      expect(app.searchError).toEqual('');
      expect(app.movieResults).toEqual(mockSuccessResults.Search);
    });

    it('should handle search error', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.handleSearchResults(mockFailureResults);
      expect(app.searchError).toEqual('Mock error');
      expect(app.movieResults).toEqual([]);
    });

    it('should search for a new movie query', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(app, 'getMovies');
      app.onMovieSearch('once');
      expect(app.getMovies).toHaveBeenCalledWith('once');
    });
  });
});
