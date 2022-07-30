import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Recipe } from '../model/recipe.model';
import { AuthService } from './auth.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();

    this.http.put(environment.storageApi, recipes).subscribe((data) => {
      console.log(data);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(environment.storageApi).pipe(  //Moved the attaching token functionality to Interceptor
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}

// Previous Method TO Add Token With Each Requests

// fetchRecipes() {
//   return this.authService.user.pipe(
//     take(1), //Automatically Unsubscribes the First User Observable on First Emission
//     exhaustMap((user) => { //Gets the Data form the User Observable and passes the varaibale to next OBervable
//       return this.http.get<Recipe[]>(environment.storageApi , {
//         params: new HttpParams().set('auth' , user?.token as string)
//       });
//     }),
//     map((recipes) => {
//       return recipes.map((recipe) => {
//         return {
//           ...recipe,
//           ingredients: recipe.ingredients ? recipe.ingredients : [],
//         };
//       });
//     }),
//     tap((recipes) => {
//       this.recipeService.setRecipes(recipes);
//     })
//   );
// }

// ===================================================================================================================

// Previous Without Auth State Management

// storeRecipes() {
//   const recipes: Recipe[] = this.recipeService.getRecipes();

//   this.http.put(environment.storageApi, recipes).subscribe((data) => {
//     console.log(data);
//   });
// }

// fetchRecipes() {
//   return this.http.get<Recipe[]>(environment.storageApi).pipe(
//     map((recipes) => {
//       return recipes.map((recipe) => {
//         return {
//           ...recipe,
//           ingredients: recipe.ingredients ? recipe.ingredients : [],
//         };
//       });
//     }),
//     tap((recipes) => {
//       this.recipeService.setRecipes(recipes);
//     })
//   );
// }
