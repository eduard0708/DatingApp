import { Component } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'API';

  constructor(private accountService: AccountService){}
ngOnInit(): void {

  const user:User = JSON.parse(localStorage.getItem('user') || '{}' );
  if (user.token === undefined) {
    this.accountService.currentUserSource.next(undefined);
  } else{
    this.accountService.setCurrentUser(user);
  }
}

}
