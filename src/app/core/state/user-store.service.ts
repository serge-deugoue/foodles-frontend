import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../model/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private readonly _activeUser = new BehaviorSubject<IUser>(null);
  // Expose the observable$ part of the _todos subject (read only stream)
  readonly activeUser$ = this._activeUser.asObservable();

  get activeUser(){
    return this._activeUser.getValue()
  }

  constructor( private userService: UserService) {
  }

  setActiveUser(user:IUser){
    this._activeUser.next(user)
  }
}
