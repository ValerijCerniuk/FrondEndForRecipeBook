import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe';

const apiUrl: string = "http://localhost:8080/api/recipes/"

@Component({
  selector: 'add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {


  recipe: Recipe = {} as Recipe;
 
  recipeForm = new FormGroup({
    name: new FormControl(this.recipe.name,[
      Validators.required,
      Validators.maxLength(40)
    ]),
    description: new FormControl('',[
      Validators.required,
      Validators.maxLength(255)
    ]),

  });

  constructor(private http: HttpClient) { }

  onSubmit() {
    console.warn(this.recipeForm.value);
    this.recipe = this.recipeForm.value;
    if (this.recipe !== undefined){
    this.http.post<Recipe>(apiUrl, this.recipeForm.value).subscribe((results) => {this.recipe = results})
    
}
}
  ngOnInit(): void {
  }

}
