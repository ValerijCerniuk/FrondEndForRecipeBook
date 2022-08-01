import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RecipesStage } from '../models/recipes-stage';

const API_URL = 'http://localhost:8080/api/recipes/';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {

  constructor(private http:HttpClient) { }

  getAllRecipes(): Observable<Recipe[]>{
    return this.http
    .get<Recipe[]>(API_URL )
    .pipe(retry(1),catchError(this.handleError))
  }

  createRecipe(data: Recipe): Observable<Recipe>{
    return this.http.post(API_URL , data)
  }

  getAllRecipesStages(): Observable<RecipesStage>{
    return this.http
    .get<RecipesStage>(API_URL + 'recipe-stages/')
    .pipe(retry(1),catchError(this.handleError))
  }

  getRecipeById(id: number): Observable<Recipe>{
    return this.http.get(`${API_URL}${id}`)
  }

  addRecipe(data: Recipe): Observable<Recipe>{
    return this.http.post(API_URL, data);
  }

// apkeist 2 i kintama recipeId
  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put(`${API_URL}${recipe.id}`, recipe, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
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
