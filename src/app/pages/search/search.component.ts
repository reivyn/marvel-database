import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, takeUntil} from 'rxjs/operators';

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
   * Handle when the user change a page
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.searchParams.firstChange) {
      const params = changes.searchParams.currentValue;
      this.search$.next({value: this.searchValue, page: params.page})
    }
  }

  /**
   * Trigger the search API
   */
  searchTrigger() {
    this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged((x, y) => {
        return !this.searchValue ? true : x === y
      }),
      switchMap(params => {
          return this.searchData$ =
            this.searchService[`get${this.searchParams.type}ById`](params.page || 0, params.value)
              .pipe(
                map(characters => {
                  console.log(characters)
                  this.totalItems = characters['total'];
                  this.currentOffset = characters['offset'];
                  return characters['results']
                }))
        }
      )).subscribe(() => {
      this.emitSearchResult();
    })
  }

  /**
   * Get the user input
   * @param $event
   */
  searchText($event: string) {
    $event ? this.search$.next({value: $event, page: 0}) : this.searchResult.emit('')
  }


  /**
   * Emit the API result to the component
   * @private
   */
  private emitSearchResult() {
    this.searchResult.emit({data: this.searchData$, totalItems: this.totalItems, offset: this.currentOffset});
  }
}
