import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
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
  inputTwo = new FormControl('initial input two');
  bsConfig:Partial<BsDatepickerConfig>;
  maxDate:Date;
  validatorErrors:string[]=[];

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
      this.initializeForm();
      this.bsConfig = {
        containerClass: 'theme-red',
        dateInputFormat:'DD MMMM YYYY'
      };
      this.maxDate = new Date();
      this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matValues('password') ]]
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
    this.accountService.register(this.model).subscribe(user => {
      this.router.navigateByUrl('/members');
    }, error =>{
      this.validatorErrors = error;
    });
   console.log(this.registerForm.value);
    
  }

  onCancel(){
    this.cancelRegister.emit(false);

  }
}
