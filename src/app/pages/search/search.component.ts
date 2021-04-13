import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {SearchResult} from '../../shared/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit, OnChanges {

  @Input() searchParams: any;
  @Input() label: string;
  @Output() searchResult = new EventEmitter<any>();
  searchData$: Observable<any>;
  searchValue: any;
  search$ = new Subject<{ value; page; }>();
  totalItems: number;
  currentOffset: number;

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.searchTrigger();
  }

  /**
   * @description Handle when the user change a page
   * @param changes catch new values
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.searchParams.firstChange) {
      const params = changes.searchParams.currentValue;
      this.search$.next({value: this.searchValue, page: params.page});
    }
  }

  /**
   * Trigger the search API
   */
  searchTrigger(): void {
    this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged((x, y) => {
        return !this.searchValue ? true : x === y;
      }),
      switchMap(params => {
          return this.searchData$ =
            this.searchService[`get${this.searchParams.type}ById`](params.page || 0, params.value)
              .pipe(
                map((value: SearchResult) => {
                  this.totalItems = value.total;
                  this.currentOffset = value.offset;
                  return value.results;
                }));
        }
      )).subscribe(() => {
      this.emitSearchResult();
    });
  }

  /**
   * @description Get the user input
   * @param $event get search box event
   */
  searchText($event: string): void {
    $event ? this.search$.next({value: $event, page: 0}) : this.searchResult.emit('');
  }


  /**
   * Emit the API result to the component
   */
  private emitSearchResult(): void {
    this.searchResult.emit({data: this.searchData$, totalItems: this.totalItems, offset: this.currentOffset});
  }
}
