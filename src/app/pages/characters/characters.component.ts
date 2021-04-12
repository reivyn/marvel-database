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
  @ViewChild('charactersPaginator') charactersPaginator : MatPaginator;

  charactersData$: any;
  paginatorLength = 0;
  searchParams = {page: 0, type: 'Character'};
  hasSearchText = false;

  constructor(private charactersApi: CharactersService) {}

  ngOnInit(): void {
    this.charactersData$ = this.getAllCharacters();
  }

  /**
   * Call Marvel Character API - GET Method
   * @param start
   * @param searchName
   */
  getAllCharacters(page = 0): Observable<any> {
    return this.charactersApi.getAllCharacter(page)
      .pipe(
        map(characters => {
          if(page === 0) {this.charactersPaginator.firstPage()}
          this.paginatorLength = characters['total'] || 0;
          return characters['results']
        })
      );
  }

  /**
   * Function to handle the page change.
   * @param $event
   */
  changePage($event: PageEvent) {
    if (!this.hasSearchText) {
      this.charactersData$ = this.getAllCharacters($event.pageIndex * 20);
    } else {
      this.searchParams = {page: $event.pageIndex * 20, type: 'Character'};
    }
  }

  /**
   * Handle Search Box Result
   * @param $event
   */
  getSearchResult($event) {
    if ($event) {
      if($event.offset === 0){ this.charactersPaginator.firstPage()}
      this.charactersData$ = $event.data;
      this.paginatorLength = $event.totalItems;
      this.hasSearchText = true;
    } else {
      this.paginatorLength = 0;
      this.hasSearchText = false;
      this.charactersData$ = this.getAllCharacters(0);
    }
  }
}
