import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFood } from '../model/food';
import { IOrder } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.apiUrl+'api/order/'

  constructor(private http: HttpClient) { }

  orderFood(order : IOrder) {
    return this.http.post(this.url, order)
  }

}
