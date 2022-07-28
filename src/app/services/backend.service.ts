import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();

    this.http
      .put(
        'https://recipe-app-59b93-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-app-59b93-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      ).pipe(map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe , ingredients: recipe.ingredients ? recipe.ingredients : [] }
        });
      }) , 
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));
  }
}
