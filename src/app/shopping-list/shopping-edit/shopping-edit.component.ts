import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Ingredient } from 'src/app/shared/model/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // Previous approach

  // @ViewChild('nameInput', { static: true }) nameInput!: ElementRef;
  // @ViewChild('amountInput', { static: true }) amountInput!: ElementRef;

  subscription: Subscription = new Subscription();

  // SINCE WE ARE RESUING THIS COMPONENT FOR ADD AS WELL AS EDIT
  editMode: boolean = false;
  itemToEditIndex!: number;
  itemToEdit!: Ingredient;

  // To Set Values of the form in Edit Mode
  @ViewChild('addItemForm', { static: false }) editItemForm!: NgForm;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.subscription =  this.shoppingService.ingredientToEdit.subscribe((index: number) => {
      this.itemToEditIndex = index;
      this.editMode = true;
      this.itemToEdit = this.shoppingService.getIngredient(this.itemToEditIndex);
      this.editItemForm.setValue({
        name: this.itemToEdit.name,
        amount: this.itemToEdit.amount
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Previous Method

  // onAddItem(event: Event) {
  //   event.preventDefault();
  //   const [name, amount] = [
  //     this.nameInput.nativeElement.value,
  //     this.amountInput.nativeElement.value,
  //   ];
  //   const ingredientToAdd = new Ingredient(name, amount);

  //   this.shoppingService.addIngredients(ingredientToAdd);
  // }

  onAddItem(form: NgForm) {
    const { name, amount } = form.value;
    const ingredientToAdd = new Ingredient(name, amount);

    if(this.editMode) {
      this.shoppingService.updateIngredient(this.itemToEditIndex , ingredientToAdd);
    } else {
      this.shoppingService.addIngredients(ingredientToAdd);
    }

    form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.itemToEditIndex)
    this.onClear();
  }

  onClear() {
    this.editItemForm.reset();
    this.editMode = false;
  }
}
