
import { Ingredient } from "./ingredient";
import { RecipeStage } from "./recipe-stage";

export interface Recipe {
    id: number;
    name: string;
    description: string;
    recipeStages: RecipeStage[];
    ingredients: Ingredient[];
}
