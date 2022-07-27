import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/model/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private ingredients: Ingredient[] = [];

  ingredientsUpdated = new Subject<Ingredient[]>();

  ingredientToEdit = new Subject<number>();

  constructor() {}

  getIngredientsList(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  updateIngredient(index: number , newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsUpdated.next(this.ingredients.slice())
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index , 1);
    this.ingredientsUpdated.next(this.ingredients.slice())
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  getIngredientsFromRecipe(ingredients: Ingredient[]): void {
    this.ingredients = ingredients;
  }
}
