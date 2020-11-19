import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IUser } from '../core/model/user';
import { OrderService } from '../core/services/order.service';
import { UserService } from '../core/services/user.service';
import { FoodStoreService } from '../core/state/food-store.service';
import { UserStoreService } from '../core/state/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  basketTotal: number =null
  users$: Observable<IUser[]>
  successMessage:string
  errorMessage:string 
  
  @ViewChild('errorAlert', {static: false}) errorAlert: NgbAlert;
  @ViewChild('successAlert', {static: false}) successAlert: NgbAlert;

  constructor( private foodStore: FoodStoreService, private userService:UserService, 
    private userStore : UserStoreService, private orderService:OrderService) { 
  }

  ngOnInit(): void {
    this.users$ = this.userStore.userList$
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

  submitBasket(){
    // check if user is selected
    if(!this.userStore.activeUser){
      // user not  selected. show error      
      this.errorMessage = "Please select a user"
      setTimeout(() => this.errorAlert?.close(), 2000);

    }
    else{
      // user is selected, submit the basket
      let basket = this.foodStore.foodBasket
      let orderItems = Object.keys(basket).map( e=>{
        return {food:parseInt(e), quantity:basket[e]}
      });
      let customer = this.userStore.activeUser.id
      let order = {customer, orderItems}
      this.orderService.orderFood(order).subscribe(
        (result)=>{
          if (result['succeed']===1){
            // clear basket
            this.foodStore.clearBasket()

            // order successful, update user
            this.userStore.updateUser(result['updatedUser'])
            // update stocks
            this.foodStore.updateFoodList()
          }

        },
        err=>console.log(err),
        ()=>{
          this.successMessage = "Basket submitted successfully"
          setTimeout(() => this.successAlert?.close(), 2000);
        }
      )
      
    }
  }

  changeUser(userString: string){
    let user = JSON.parse(userString)
    this.userStore.setActiveUser(user)
  }

}
