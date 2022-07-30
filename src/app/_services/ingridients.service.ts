import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Ingridient } from '../models/ingridient';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class IngridientsService {

  constructor(private http: HttpClient) { }

  getAllIngredients(): Observable<any>{
    return this.http
    .get<Ingridient>(API_URL + 'ingredients/')
    .pipe(retry(1),catchError(this.handleError))
  }

    handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
