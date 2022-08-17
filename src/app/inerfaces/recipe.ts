
import { Ingredient } from "./ingredient";
import { RecipeStage } from "./recipe-stage";

export interface Recipe {
    id: number;
    name: string;
    description: string;
    photo1: number;
    photo2: number;
    recipeStages: RecipeStage[];
    ingredients: Ingredient[];
}
