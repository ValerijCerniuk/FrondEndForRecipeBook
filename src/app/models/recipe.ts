import { Ingredient } from './ingredient';
import { RecipesStage } from './recipes-stage';
export class Recipe {
     id? : number;
     name?: string;
     description?: string;
     recipeStages?: RecipesStage[];
     ingredients?: Ingredient[];
}
