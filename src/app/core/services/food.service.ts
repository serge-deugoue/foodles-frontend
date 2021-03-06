import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFood } from '../model/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {


  private url = environment.apiUrl+'api/food/'

  constructor(private http: HttpClient) { }

  getFoodsList(): Observable<IFood[]>{
    return this.http.get<IFood[]>(this.url)
  }
}
