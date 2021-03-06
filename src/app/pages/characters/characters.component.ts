import {Component, OnInit, ViewChild} from '@angular/core';
import {CharactersService} from '../../services/characters.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.sass']
})
export class CharactersComponent implements OnInit {
  @ViewChild('cardsPaginator') charactersPaginator: MatPaginator;
  charactersData$: any;
  paginatorLength = 0;
  searchParams = {page: 0, type: 'Character'};
  hasSearchText = false;
  buttons = {
    first: 'comics',
    second: 'stories',
    third: 'characters'
  };
  loadingFlag = true;

  constructor(private charactersApi: CharactersService) {
  }

  ngOnInit(): void {
    this.charactersData$ = this.getAllCharacters();
  }

  /**
   * Call Marvel Character API - GET Method
   */
  getAllCharacters(page = 0): Observable<any> {
    return this.charactersApi.get(page)
      .pipe(
        map(characters => {
          this.loadingFlag = false;
          if (page === 0) {
            this.charactersPaginator.firstPage();
          }
          this.paginatorLength = characters?.total || 0;
          return characters?.results;
        })
      );
  }

  /**
   * Function to handle the page change.
   */
  changePage($event: PageEvent): void {
    if (!this.hasSearchText) {
      this.loadingFlag = true;
      this.charactersData$ = this.getAllCharacters($event.pageIndex * 20);
    } else {
      this.searchParams = {page: $event.pageIndex * 20, type: 'Character'};
    }
  }

  /**
   * Handle Search Box Result
   */
  getSearchResult($event): void {
    this.hasSearchText = !!$event;
    if ($event) {
      if ($event.offset === 0) {
        this.charactersPaginator.firstPage();
      }
      this.charactersData$ = $event.data;
      this.paginatorLength = $event.totalItems;
    } else {
      this.paginatorLength = 0;
      this.charactersData$ = this.getAllCharacters(0);
    }
  }
}
