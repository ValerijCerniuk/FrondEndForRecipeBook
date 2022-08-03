import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { RecipesService } from 'src/app/_services/recipes.service';
import { Ingredient } from '../../inerfases/ingredient';
import { Recipe } from '../../inerfases/recipe';
import { IngridientsService } from '../../_services/ingridients.service';

const apiUrl: string = "http://localhost:8080/api/recipes/"

@Component({
  selector: 'add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipeData: Recipe = {} as Recipe;

  ingredientList: Ingredient[] = {} as Ingredient[];

  recipeForm: FormGroup = {} as FormGroup;
  ingredientForm: FormGroup = {} as FormGroup;
  recipeStageForm: FormGroup = {} as FormGroup;


  constructor(
    private recipesService: RecipesService,
    private ingredientService: IngridientsService,
    private fb: FormBuilder) {
    this.recipeForm = fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: fb.array([]) as FormArray,
      recipeStages: fb.array([]) as FormArray,
    }) as FormGroup;

    this.ingredientForm = this.fb.group({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    }) as FormGroup;

    this.recipeStageForm = this.fb.group({
      instructionOrder: new FormControl('', Validators.required),
      instruction: new FormControl('', Validators.required),
    }) as FormGroup;
  }

  get recipeStages() {
    return this.recipeForm.controls['recipeStages'] as FormArray;
  }
  get ingredients() {
    return this.recipeForm.controls['ingredients'] as FormArray;
  }

  ngOnInit(): void {
    this.recipeForm = this.recipeForm;
    this.ingredientForm = this.ingredientForm;
    this.recipeStageForm = this.recipeStageForm;

    this.ingredientService.getAllIngredients().subscribe({
      next: (data) => {
        this.ingredientList = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  addNewIngredientGroup() {
    this.ingredients.push(this.ingredientForm as FormGroup);
  };

  addNewStageGroup() {
    this.recipeStages.push(this.recipeStageForm as FormGroup);
  }

  deleteStageFormGroup(index: number) {
    this.recipeStages.removeAt(index);
  }

  deleteIngredientFormGroup(index: number) {
    this.ingredients.removeAt(index);
  }

  removeEmptyStage() {
    let indexToRemove: any = [];

    this.recipeStages.controls.forEach((cotrol, index) => {
      if (!cotrol.value.name) {
        indexToRemove.push(index)
      }
    });
    indexToRemove.reverse().forEach((index: any) => {
      this.recipeStages.removeAt(index);
    })
  }

  removeEmptyIngredient() {
    let indexToRemove: any = [];

    this.ingredients.controls.forEach((cotrol, index) => {
      if (!cotrol.value.name) {
        indexToRemove.push(index)
      }
    });
    indexToRemove.reverse().forEach((index: any) => {
      this.ingredients.removeAt(index);
    })
  }

  addProduct(): void {
    this.removeEmptyIngredient;
    this.removeEmptyStage;
    this.recipeData = this.recipeForm.value
    if (this.recipeData) {
      this.recipesService.createRecipe(this.recipeData).subscribe({
        next: (res) => {
          console.log(res);
          if(res != null){
            this.recipeForm.reset();
            this.removeEmptyIngredient();
            this.removeEmptyStage();
          }
        },
        error: (e) => console.error(e)
      });
    }
    

  }


}
