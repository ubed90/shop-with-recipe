import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private ingredients: Ingredient[] = [];

  ingredientsUpdated = new EventEmitter<Ingredient[]>();

  constructor() {}

  getIngredientsList(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsUpdated.emit(this.ingredients.slice());
  }

  getIngredientsFromRecipe(ingredients: Ingredient[]): void {
    this.ingredients = ingredients;
  }
}
