import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserType } from '../../models/types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = "http://localhost:3000/api/auth/register";
  private isIn = false
  private aboutUser: any
  constructor(private http: HttpClient,private router: Router) { }

  saveToLocalStorage(data: any) {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem('currentUser', serializedData);
        console.log('Data successfully saved to localStorage.');
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    } else {
      console.error('localStorage is not available.');
    }
    this.isIn = true
    this.aboutUser = data
  }

  addUser(item: UserType) {
    this.http.post(this.apiURL, item).subscribe((response) => {
      console.log(response);
      this.saveToLocalStorage(response);
      this.router.navigate(['/inner-app']);
    });
  }

  loginUser(user: UserType) {
    const URL = "http://localhost:3000/api/auth/login";
    this.http.post(URL, user).subscribe((response: any) => {
      console.log(response);
      this.saveToLocalStorage(response);
      this.router.navigate(['/inner-app']);
    });
  }

  getFromLocalStorage() {
    if (this.isIn) {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        const user = JSON.parse(userJson);
        console.log(user);
        return { token: user.token, id: user.userId };
      }
    }
    return { token: '', id: -1 };


  }

  clearFromLocalStorage() {
    localStorage.removeItem('currentUser');

    this.isIn = false
  }

  getUserDetails(): Observable<UserType> {
    const { token, id } = this.getFromLocalStorage();
    console.log("token = " + token);

    const URL = "http://localhost:3000/api/users/" + id;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserType>(URL, { headers });
  }

  isLoggedIn(): boolean {
    return this.isIn
  }
}