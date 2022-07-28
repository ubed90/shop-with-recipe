import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { BackendService } from './backend.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private backendService: BackendService , private recipeService: RecipeService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipe = this.recipeService.getRecipes();

    if(recipe.length === 0) {
      return this.backendService.fetchRecipes();
    }
    
    return recipe;
  }
}
