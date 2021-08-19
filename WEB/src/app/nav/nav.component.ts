import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any= {};

  constructor(public accountService: AccountService, private route: Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.accountService.login(this.model).subscribe(data => {
      this.route.navigateByUrl('/members')
    }, error => {this.toastr.error(error.error)} );

  }

  onLogout(){
    this.accountService.logout();
    this.route.navigateByUrl('/')
  }
}
