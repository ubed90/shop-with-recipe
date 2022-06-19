import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 100),
    new Ingredient('Tomatoes', 50),
  ];

  constructor() {}

  ngOnInit(): void {}
}