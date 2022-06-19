import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Burger',
      'A Mexican Burger',
      'assets/images/recipes/burgaz.png'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
