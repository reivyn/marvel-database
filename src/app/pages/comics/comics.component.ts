import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ComicsService} from '../../services/comics.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.sass']
})
export class ComicsComponent implements OnInit {
  @ViewChild('cardsPaginator') comicsPaginator : MatPaginator;

  comicsData$: any;
  paginatorLength = 0;
  searchParams = {page: 0, type: 'Comic'};
  hasSearchText = false;
  buttons = {
    first: 'characters',
    second: 'stories',
    third: 'comics'
  }
  loadingFlag = true;

  constructor(private comicsService: ComicsService) {}

  ngOnInit(): void {
    this.comicsData$ = this.getAllComics();
  }

  /**
   * Call Marvel Comics API - GET Method
   * @param start
   * @param searchName
   */
  getAllComics(page = 0): Observable<any> {
    return this.comicsService.get(page)
      .pipe(
        map(comics => {
          this.loadingFlag = false;
          if(page === 0) {this.comicsPaginator.firstPage()}
          this.paginatorLength = comics['total'] || 0;
          return comics['results']
        })
      );
  }

  /**
   * Function to handle the page change.
   * @param $event
   */
  changePage($event: PageEvent) {
    if (!this.hasSearchText) {
      this.loadingFlag = true;
      this.comicsData$ = this.getAllComics($event.pageIndex * 20);
    } else {
      this.searchParams = {page: $event.pageIndex * 20, type: 'Comic'};
    }
  }

  /**
   * Handle Search Box Result
   * @param $event
   */
  getSearchResult($event) {
    this.hasSearchText = !!$event;
    if ($event) {
      if($event.offset === 0){ this.comicsPaginator.firstPage()}
      this.comicsData$ = $event.data;
      this.paginatorLength = $event.totalItems;
    } else {
      this.paginatorLength = 0;
      this.comicsData$ = this.getAllComics(0);
    }
  }

}
