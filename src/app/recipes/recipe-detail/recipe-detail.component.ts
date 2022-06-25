import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe!: Recipe;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  addToShoppingList() {
    this.shoppingService.getIngredientsFromRecipe(this.recipe.ingredients);
  }
}
