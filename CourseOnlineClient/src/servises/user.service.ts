import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL="http://localhost:3000/api/auth/register" 
  constructor(private http: HttpClient) { 
   
  }
  addUser(item: UserType): Observable<any> {
    return this.http.post(this.apiURL, item);
  }
   
}
