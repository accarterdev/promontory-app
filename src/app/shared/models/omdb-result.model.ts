import { MovieResult } from './movie-result.model';

export interface OmdbResult {
  Response: string;
  Search: MovieResult[];
  totalResults: string;
  Error?: string;
}
