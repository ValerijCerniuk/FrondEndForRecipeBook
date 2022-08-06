
import { Ingredient } from "./ingredient";
import { RecipeStage } from "./recipe-stage";

export interface Recipe {
    id: number;
    name: string;
    description: string;
    photo1: string;
    photo2: string;
    recipeStages: RecipeStage[];
    ingredients: Ingredient[];
}
