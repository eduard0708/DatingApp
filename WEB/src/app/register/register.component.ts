import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  registerForm:FormGroup;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
      this.initializeForm();
  }

  initializeForm(){
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.matValues('password') ])
    })

    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matValues(matchTo:string):ValidatorFn{
     return (control: AbstractControl) => {
       return control?.value === control?.parent?.controls[matchTo].value ? null: {isMatching: true}
     }

  }

  onRegister(){
    this.accountService.register(this.model).subscribe(user => {}, error => console.log(error)
    )
  }

  onCancel(){
    this.cancelRegister.emit(false);

  }
}
