import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_service/account.service';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member:Member = '' as any;
  user:User = '' as any;

  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.curentUser$.pipe(take(1)).subscribe(user => this.user = user);

  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(member => {this.member = member});
    console.log(this.member.city);

  }

}
