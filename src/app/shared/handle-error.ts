import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';


/**
 * @description Handle Errors Function
 * @param error Error Response from Server
 */
export function handleError(error: HttpErrorResponse): Observable<never> {
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
