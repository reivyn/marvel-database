import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {catchError, map, retry, shareReplay} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {handleError} from '../shared/handle-error';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  defaultParams = new HttpParams()
    .set('ts', environment.marvelTs)
    .set('apikey', environment.marvelApiKey)
    .set('hash', environment.marvelHash);

  constructor(private http: HttpClient) {
  }


  /**
   * @description Get Marvel Heroes by ID
   * @param pageIndex Current Page Index
   * @param nameStartsWith Text to Search
   */
  getCharacterById(pageIndex, nameStartsWith): Observable<any> {
    const options = {params: this.defaultParams};
    options.params = options.params.append('offset', pageIndex);
    options.params = options.params.append('nameStartsWith', nameStartsWith);

    return this.http.get<any>(environment.marvelCharactersAPI, options)
      .pipe(
        retry(3),
        catchError(handleError),
        map(source => source?.data),
        shareReplay()
      );
  }

  /**
   * @description Get Marvel Comics by ID
   * @param pageIndex Current Page Index
   * @param nameStartsWith Text to Search
   */
  getComicById(pageIndex, nameStartsWith): Observable<any> {
    const options = {params: this.defaultParams};
    options.params = options.params.append('offset', pageIndex);
    options.params = options.params.append('titleStartsWith', nameStartsWith);

    return this.http.get<any>(environment.marvelComicsAPI, options)
      .pipe(
        retry(3),
        catchError(handleError),
        map(source => source?.data),
        shareReplay()
      );
  }

  /**
   * @description Get Marvel Stories by ID
   * @param pageIndex Current Page Index
   * @param nameStartsWith Text to Search
   */
  getStorieById(pageIndex, nameStartsWith): Observable<any> {
    const options = {params: this.defaultParams};
    options.params = options.params.append('offset', pageIndex);
    options.params = options.params.append('nameStartsWith', nameStartsWith);

    return this.http.get<any>(environment.marvelCharactersAPI, options)
      .pipe(
        retry(3),
        catchError(handleError),
        map(source => source?.data),
        shareReplay()
      );
  }
}
