import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { Ingredient } from '../shared/model/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Burger',
      'A Mexican Burger',
      'assets/images/recipes/burgaz.png',
      [
        new Ingredient('Burger Bun', 2),
        new Ingredient('Mayonnaise', 1),
        new Ingredient('Cheese', 1),
        new Ingredient('Meat', 1),
      ]
    ),
    new Recipe(
      'Fries',
      'Spanish French Fries',
      'assets/images/recipes/fries.jpg',
      [
        new Ingredient('Potatoes', 10),
        new Ingredient('Pepper', 1),
        new Ingredient('Cheese', 1),
        new Ingredient('Sauce', 1),
      ]
    ),
  ];

  constructor() {}

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index , 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
