import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDetailedInfo } from '../models/movie-detailed-info.model';
import { MovieResult } from '../models/movie-result.model';
import { OmdbResult } from '../models/omdb-result.model';

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  private apiKey: string = 'a4d98298';
  //Just commenting here to note that in a real production app, I would certainly never dream of storing an api key in an Angular service.
  constructor(private http: HttpClient) {}

  getMoviesByTitle(titleQuery: string = 'coach'): Observable<OmdbResult> {
    return this.http.get<OmdbResult>(
      `/api/?s=${titleQuery}&apikey=${this.apiKey}`,
      {
        withCredentials: true,
      }
    );
  }

  getMovieDetails(imdbID: string): Observable<MovieDetailedInfo> {
    return this.http.get<MovieDetailedInfo>(
      `/api/?i=${imdbID}&apikey=${this.apiKey}`,
      { withCredentials: true }
    );
  }
}
