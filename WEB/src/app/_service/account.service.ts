import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEvent, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  currentUserSource = new ReplaySubject<User>(1);
  curentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  login(user: User) {
    return this.http.post<User>(this.baseUrl + 'account/login', user).pipe(
      map((user: User) => {
        if (user) {
    this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: User){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user:User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    this.currentUserSource.next(undefined);
    localStorage.removeItem('user');
  }

}
