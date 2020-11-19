import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../model/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private readonly _activeUser = new BehaviorSubject<IUser>(null);
  private readonly _userList = new BehaviorSubject<IUser[]>([]);
  // Expose the observable$ part of the _todos subject (read only stream)
  readonly activeUser$ = this._activeUser.asObservable();
  readonly userList$ = this._userList.asObservable()

  get activeUser(){
    return this._activeUser.getValue()
  }

  get userList(){
    return this._userList.getValue()
  }

  constructor( private userService: UserService) {
    // initialize the users list
    this.userService.getUsers().subscribe(
      (users : IUser[])=> this._userList.next(users)
    )
  }

  setActiveUser(userIndex: number){
    this._activeUser.next(this.userList[userIndex])

  }

  updateUser(newUser:IUser, userIndex:number){
    // update user in user list
    let newList  = [...this.userList]
    newList[userIndex]=newUser
    this._userList.next(newList)
    
  }
}
