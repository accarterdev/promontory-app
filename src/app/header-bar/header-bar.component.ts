import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NavService } from '../shared/nav-service/nav.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
  @Input() appTitle: string = '';
  @Input() movieQuery: string = '';
  // @Input() isSideNavHidden: boolean = false;
  movieQueryChanged: Subject<string> = new Subject<string>();
  @Output()
  movieSearchEmitter: EventEmitter<string> = new EventEmitter<string>();

  get isSideNavHidden(): boolean {
    return this.navService.hideSideNav;
  }

  constructor(public navService: NavService) {
    this.movieQueryChanged.pipe(debounceTime(700)).subscribe((model) => {
      this.movieQuery = model;
      this.movieSearchEmitter.emit(this.movieQuery);
    });
  }

  ngOnInit(): void {}

  onSearchFieldChange(query: string): void {
    this.movieQueryChanged.next(query);
  }

  toggleNav() {
    this.navService.toggleSideNav();
  }
}
