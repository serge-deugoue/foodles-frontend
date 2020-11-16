import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../core/model/user';
import { UserService } from '../core/services/user.service';
import { FoodStoreService } from '../core/state/food-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  basketTotal: number =null
  users$: Observable<IUser[]>
  successMessage:string ="test"
  errorMessage:string ="test"

  constructor( private foodStore: FoodStoreService, private userService:UserService) { 
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers()
    this.calculateBasketValue()
  }

  calculateBasketValue(){
    this.foodStore.foodBasket$.subscribe(
      (basket: object)=>{
        if(Object.keys(basket).length===0){
          this.basketTotal=null
        }
        else{
          let sum = 0
          Object.keys(basket).forEach(val=>{
            sum+= basket[val]*this.priceofFood(parseInt(val))
          })
          this.basketTotal = sum
        }
       
      }
    )
    this.foodStore.foodList$
  }

  priceofFood(foodId:number){
    for (let food of this.foodStore.foodList){
      if (food.id === foodId){
        return food.price
      }
    }
    return null
  }

  userString(user:IUser){
    return `${user.email} // ${user.credit} €`
  }

}
