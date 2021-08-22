import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

const httOptions = {
  headers: new HttpHeaders({
    Autorization:'Bearer' + JSON.parse(localStorage.getItem('user') || '{}').token
  })
}


@Injectable({
  providedIn: 'root'
})
export class MembersService {


  
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'users', httOptions);
  }

  getMember(username: string){
    return this.http.get<Member>(this.baseUrl + 'users/' + username, httOptions);
  }
  
}
