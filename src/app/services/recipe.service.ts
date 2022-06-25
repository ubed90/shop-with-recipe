import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Ingredient } from '../shared/model/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
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

  recipeSelected = new EventEmitter<Recipe>();

  constructor() {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
