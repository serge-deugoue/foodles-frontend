import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "assets/api/users.json"
  constructor(private http: HttpClient) {
    
  }

  getUsers(){
    return this.http.get<IUser[]>(this.url)
  }
}
