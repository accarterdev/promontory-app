import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { OmdbService } from './omdb.service';

describe('OmdbService', () => {
  let service: OmdbService;
  let http: HttpClient;

  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new OmdbService(httpClientSpy as any);

    TestBed.configureTestingModule({
      providers: [HttpClient],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(OmdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('service methods', () => {
    it('should search for movies with a movie title query', () => {});
  });
});
