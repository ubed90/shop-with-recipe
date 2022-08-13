import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: async () => (await import('./recipes/recipes.module')).RecipesModule
  },
  {
    path: 'shopping-list',
    loadChildren: async () => (await import('./shopping-list/shopping-list.module')).ShoppingListModule
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('./auth/auth.module')).AuthModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
