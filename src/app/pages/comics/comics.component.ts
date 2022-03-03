import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ComicsService} from '../../services/comics.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.sass']
})
export class ComicsComponent implements OnInit {
  @ViewChild('cardsPaginator') comicsPaginator: MatPaginator;

  comicsData$: any;
  paginatorLength = 0;
  searchParams = {page: 0, type: 'Comic'};
  hasSearchText = false;
  buttons = {
    first: 'characters',
    second: 'stories',
    third: 'comics'
  };
  loadingFlag = true;
  characterId = null;


  constructor(
    private route: ActivatedRoute,
    private comicsService: ComicsService,
    private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {

  }

  ngOnInit(): void {
    this._snackBar.open('Sorry, this page is under construction', 'Dismiss');
    this.characterId = this.route.snapshot.paramMap.get('id');
    // console.log(characterId)
    if (this.characterId) {
      this.comicsData$ = this.getAllCharacterComics();
    } else {
      this.comicsData$ = this.getAllComics();
    }
  }

  /**
   * @description Call Marvel Comics API - GET Method
   * @param page Current Page
   */
  getAllComics(page = 0): Observable<any> {
    return this.comicsService.get(page)
      .pipe(
        map(comics => {
          this.loadingFlag = false;
          if (page === 0) {
            this.comicsPaginator.firstPage();
          }
          this.paginatorLength = comics?.total || 0;
          return comics?.results;
        })
      );
  }

  /**
   * @description Ger all related comic from a character
   * @param page Current Page
   */
  getAllCharacterComics(page = 0): Observable<any> {
    return this.comicsService.getCharacterComics(page, this.characterId)
      .pipe(
        map(comics => {
          this.loadingFlag = false;
          if (page === 0) {
            this.comicsPaginator.firstPage();
          }
          this.paginatorLength = comics?.total || 0;
          return comics?.results;
        })
      );
  }

  /**
   * @description Function to handle the page change.
   * @param $event triggered when change page
   */
  changePage($event: PageEvent): void {
    if (!this.hasSearchText) {
      this.loadingFlag = true;
      if (this.characterId) {
        this.comicsData$ = this.getAllCharacterComics($event.pageIndex * 20);
      } else {
        this.comicsData$ = this.getAllComics($event.pageIndex * 20);
      }
    } else {
      this.searchParams = {page: $event.pageIndex * 20, type: 'Comic'};
    }
  }

  /**
   * @description Handle Search Box Result
   * @param $event Search Results Data
   */
  getSearchResult($event): void {
    this.hasSearchText = !!$event;
    if ($event) {
      if ($event.offset === 0) {
        this.comicsPaginator.firstPage();
      }
      this.comicsData$ = $event.data;
      this.paginatorLength = $event.totalItems;
    } else {
      this.paginatorLength = 0;
      this.comicsData$ = this.getAllComics(0);
    }
  }
}
