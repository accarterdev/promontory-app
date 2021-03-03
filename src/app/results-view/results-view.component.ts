import { Component, Input, OnInit } from '@angular/core';
import { MovieResult } from '../shared/models/movie-result.model';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss'],
})
export class ResultsViewComponent implements OnInit {
  @Input() loading: boolean = true;
  @Input() movieResults: MovieResult[] = [];
  @Input() errorMessage: string = '';
  resultsTitle: string = 'Movie List';

  constructor() {}

  ngOnInit(): void {}
}
