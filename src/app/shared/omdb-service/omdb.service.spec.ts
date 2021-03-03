import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MovieDetailedInfo } from '../models/movie-detailed-info.model';
import { OmdbResult } from '../models/omdb-result.model';

import { OmdbService } from './omdb.service';

const mockResults: OmdbResult = {
  Response: 'True',
  Search: [],
  totalResults: '0',
};

const mockDetailResults: MovieDetailedInfo = {
  Title: 'test',
  Year: 'test',
  Rated: 'test',
  Released: 'test',
  Runtime: 'test',
  Genre: 'test',
  Director: 'test',
  Writer: 'test',
  Actors: 'test',
  Plot: 'test',
  Language: 'test',
  Country: 'test',
  Awards: 'test',
  Poster: 'test',
  Ratings: [],
  Metascore: 'test',
  imdbRating: 'test',
  imdbVotes: 'test',
  imdbID: 'test',
  Type: 'test',
  totalSeasons: 'test',
  Response: 'test',
};

describe('OmdbService', () => {
  let service: OmdbService;
  let httpTestingContoller: HttpTestingController;

  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OmdbService],
      imports: [HttpClientTestingModule],
    });
    httpTestingContoller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(OmdbService);
  });

  afterEach(() => {
    httpTestingContoller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('service methods', () => {
    it('should search for movies with a movie title query', () => {
      service.getMoviesByTitle('coach').subscribe((results) => {
        expect(results).toEqual(mockResults);
      });
      const req = httpTestingContoller.expectOne(
        '/api/?s=coach&apikey=a4d98298'
      );
      req.flush(mockResults);
    });

    it('should fetch movie details', () => {
      service.getMovieDetails('1234').subscribe((results) => {
        expect(results).toEqual(mockDetailResults);
      });
      const req = httpTestingContoller.expectOne(
        '/api/?i=1234&apikey=a4d98298'
      );
      req.flush(mockDetailResults);
    });
  });
});
