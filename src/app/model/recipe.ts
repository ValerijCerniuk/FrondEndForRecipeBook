import { Ingredient } from "../inerfaces/ingredient";
import { RecipeStage } from "../inerfaces/recipe-stage";

export class Recipe {
    id?: number;
    name?: string;
    description?: string;
    photo1: any;
    photo2: any;
    recipeStages?: RecipeStage[];
    ingredients?: Ingredient[];
}
