import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, map, retry, shareReplay} from 'rxjs/operators';
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
   * Get All Marvel Comics
   * @param pageIndex
   */
  get(pageIndex): Observable<any> {
    const options = {params: this.defaultParams}
    options.params = options.params.append('offset', pageIndex);

    return this.http.get<any>(environment.marvelComicsAPI, options)
      .pipe(
        retry(3),
        catchError(handleError),
        map(source => source['data']),
        shareReplay()
      );
  }
}
