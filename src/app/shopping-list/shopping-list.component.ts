import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../services/shopping.service';
import { Ingredient } from '../shared/model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingService: ShoppingService) {
    this.ingredients = this.shoppingService.getIngredientsList();
    this.shoppingService.ingredientsUpdated.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnInit(): void {}
}
