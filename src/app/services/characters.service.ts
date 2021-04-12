import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  defaultParams = new HttpParams()
    .set('ts', environment.marvelTs)
    .set('apikey', environment.marvelApiKey)
    .set('hash', environment.marvelHash);

  constructor(private http: HttpClient) {}

  /**
   * Get All Marvel Characters
   * @param pageIndex
   */
  getAllCharacter(pageIndex): Observable<any> {
    const options = {params: this.defaultParams}
    options.params = options.params.append('offset', pageIndex);

    return this.http.get<any>(environment.marvelCharactersAPI, options)
      .pipe(
        retry(3),
        catchError(this.handleError),
        map(source => source['data']),
        shareReplay()
      );
  }

  /**
   *  HandleError
   * @param error
   * @private
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
