import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {handleError} from '../shared/handle-error';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  defaultParams = new HttpParams()
    .set('ts', environment.marvelTs)
    .set('apikey', environment.marvelApiKey)
    .set('hash', environment.marvelHash);

  constructor(private http: HttpClient) {
  }

  /**
   * @description Get All Marvel Comics
   * @param pageIndex Current page Index
   */
  get(pageIndex): Observable<any> {
    const options = {params: this.defaultParams};
    options.params = options.params.append('offset', pageIndex);

    return this.http.get<any>(environment.marvelComicsAPI, options)
      .pipe(
        retry(3),
        catchError(handleError),
        map(source => source?.data),
        // shareReplay()
      );
  }

  /**
   * Get All Character Related Comics
   * @param pageIndex Current Page Index
   * @param characterId Character ID
   */
  getCharacterComics(pageIndex, characterId): Observable<any> {
    const options = {params: this.defaultParams};
    options.params = options.params.append('offset', pageIndex);
    options.params = options.params.append('characterId', characterId);

    return this.http.get<any>(`${environment.marvelCharactersAPI}/${characterId}/comics`, options)
      .pipe(
        retry(3),
        catchError(handleError),
        map(source => source?.data),
        // shareReplay()
      );
  }
}
