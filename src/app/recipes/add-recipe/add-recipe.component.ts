import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';
import { RecipesStage } from 'src/app/models/recipes-stage';
import { RecipesService } from 'src/app/_services/recipes.service';

const apiUrl: string = "http://localhost:8080/api/recipes/"

@Component({
  selector: 'add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {


  recipe: Recipe = {} as Recipe;
  recipeStage: RecipesStage = {} as RecipesStage;
  ingredient: Ingredient = {} as Ingredient;

  recipeStages: RecipesStage[] = [{
    id: 0,
    instructionOrder: 1,
    instruction: 'instruction'
  }];

  ingredients: Ingredient[] = [{
    id: 0,
    name: 'name',
    amount: 'amount',
    description: 'description'
  }];

  recipeForm = new FormGroup({
    name: new FormControl(this.recipe.name, [
      Validators.required,
      Validators.maxLength(40)
    ]),
    description: new FormControl(this.recipe.description, [
      Validators.required,
      Validators.maxLength(255)
    ]),
  });

  stageForm = new FormGroup({
    instructionOrder: new FormControl(this.recipeStage.instructionOrder, [
      Validators.required
    ]),
    stageInstruction: new FormControl(this.recipeStage.instruction, [
      Validators.required,
      Validators.maxLength(255)
    ]),
  });

  ingredientForm = new FormGroup({
    name: new FormControl(this.ingredient.name, [
      Validators.required
    ]),
    amount: new FormControl(this.ingredient.amount, [
      Validators.required
    ]),
    description: new FormControl(this.ingredient.description, [
      Validators.maxLength(255)
    ])
  });

  constructor(private recipesService: RecipesService,
    private cdr: ChangeDetectorRef) { }

  onSubmit() {
  }

  ngOnInit(): void {
  }

  addIngredient(): void {
    this.ingredients.push({
      id: undefined,
      name: 'name',
      amount: 'amount',
      description: 'description'
    });
    console.log(this.ingredients)
  }

  addStage(): void {
    this.recipeStages.push({
      id: undefined,
      instructionOrder: this.recipeStages.length,
      instruction: 'instruction'
    });
    console.log(this.recipeStages)
  }

}
