import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../model/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private readonly _user = new BehaviorSubject<IUser>(null);
  // Expose the observable$ part of the _todos subject (read only stream)
  readonly user$ = this._user.asObservable();

  get user(){
    return this._user.getValue()
  }

  constructor( private userService: UserService) {
  }

  setActiveUser(user:IUser){
    this._user.next(user)
  }
}
