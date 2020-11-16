import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFood } from '../model/food';
import { FoodService } from '../services/food.service';

@Injectable({
  providedIn: 'root'
})
export class FoodStoreService {

  // food list with updates
  private readonly _foodList = new BehaviorSubject<IFood[]>([])
  readonly foodList$ = this._foodList.asObservable()

  // food Orders
  private readonly _foodBasket = new BehaviorSubject({})
  readonly foodBasket$ = this._foodBasket.asObservable()

  get foodList(): IFood[] {
    return this._foodList.getValue();
  }
  get foodBasket(){
    return this._foodBasket.getValue();
  }

  constructor(private foodService: FoodService) { 
    this.foodService.getFoodsList().subscribe(
      // load data into the behaviour subject
      result => this._foodList.next(result)
    )
  }

  addFoodToBasket(foodId:number){
    let newValue = {...this.foodBasket}
    newValue[foodId] = newValue[foodId] ? newValue[foodId]+1 : 1
    this._foodBasket.next(newValue)    
  }

  removeFoodFromBasket(foodId:number){
    let newValue = {...this.foodBasket}
    newValue[foodId] = newValue[foodId]===1 ? null :  newValue[foodId]-1
    this._foodBasket.next(newValue)    
  }

}
