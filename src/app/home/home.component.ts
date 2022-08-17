import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../inerfaces/ingredient';
import { Recipe } from '../inerfaces/recipe';

import { RecipesService } from '../_services/recipes.service';
import { FileUploadService } from '../_services/file-upload.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes: Recipe[] = [];
  ingredients: Ingredient[] = [];

  recipe!: Recipe;
  ingridient!: any;
  currentRecipe = null;
  currentIndex = -1;
  name = '';

  sanitizer: any;



  constructor(private recipeServise: RecipesService,
    private fileUpload: FileUploadService) { }

    ngOnInit(): void {
      this.retrieveRecipes();



    }
    // image part

  getRecipePhoto(photoId:any ) {
    this.fileUpload.fetchRecipeImage(photoId)
      .subscribe((result: any) => {
        let objectURL = URL.createObjectURL(result);
        return this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
  }

    // recipe part
    retrieveRecipes(): void {
      this.recipeServise.getAllRecipes()
        .subscribe(
          data => {
            this.recipes = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }

    refreshList(): void {
      this.retrieveRecipes();
      this.currentRecipe = null;
      this.currentIndex = -1;
    }
    
    setActiveRecipe(recipe: any, index: number): void {
      this.currentRecipe = recipe;
      this.currentIndex = index;

    }



}
