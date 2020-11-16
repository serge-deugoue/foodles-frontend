import { Component, OnInit } from '@angular/core';
import { FoodStoreService } from 'src/app/core/state/food-store.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {

  foodList$ =this.foodStore.foodList$
  
  constructor( private foodStore:FoodStoreService) {

  }

  ngOnInit(): void {
  }

}
