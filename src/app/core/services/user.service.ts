import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url =  environment.apiUrl+"api/user/"
  constructor(private http: HttpClient) {
    
  }

  getUsers(){
    return this.http.get<IUser[]>(this.url)
  }
}
