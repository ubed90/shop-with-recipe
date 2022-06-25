import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Ingredient } from 'src/app/shared/model/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true }) nameInput!: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInput!: ElementRef;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  onAddItem(event: Event) {
    event.preventDefault();
    const [name, amount] = [
      this.nameInput.nativeElement.value,
      this.amountInput.nativeElement.value,
    ];
    const ingredientToAdd = new Ingredient(name, amount);

    this.shoppingService.addIngredients(ingredientToAdd);
  }
}
