import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.accountService.register(this.model).subscribe(user => {}, error => console.log(error)
    )
  }

  onCancel(){
    this.cancelRegister.emit(false);

  }
}
