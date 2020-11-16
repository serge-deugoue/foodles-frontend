import { Component, Input, OnInit } from '@angular/core';
import { IFood } from 'src/app/core/model/food';
import { FoodStoreService } from 'src/app/core/state/food-store.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss']
})
export class FoodItemComponent implements OnInit {

  @Input() food:IFood

  amtInBasket = 0

  constructor(private foodStore: FoodStoreService) { }

  ngOnInit(): void {
    this.foodStore.foodBasket$.subscribe(
      basket=>{
        this.amtInBasket = basket[this.food.id]
      }
    )
  }

  addItemToCart(){
    this.foodStore.addFoodToBasket(this.food.id)
  }
  subtractItemFromCart(){
    this.foodStore.removeFoodFromBasket(this.food.id)
  }

}
