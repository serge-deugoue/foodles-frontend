import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodItemComponent } from './food-item/food-item.component';
import { FoodListComponent } from './food-list/food-list.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [FoodItemComponent, FoodListComponent],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports:[FoodItemComponent, FoodListComponent]
})
export class FoodModule { }
