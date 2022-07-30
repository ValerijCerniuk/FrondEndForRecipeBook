import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/_services/recipes.service';

@Component({
  selector: 'show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.css'],
})
export class ShowRecipeComponent implements OnInit {
  curentRecipe: Recipe = {} as Recipe;
  recipeId?: any;

  constructor(
    private recipeService: RecipesService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.recipeId = params.get('recipeId');
    });
   
    this.getRecipeById(this.recipeId)
    
  }

  getRecipeById(data: any): void {
     this.recipeService.getRecipeById(data).subscribe(
      (data) => {
        this.curentRecipe = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
