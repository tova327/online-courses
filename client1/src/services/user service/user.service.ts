import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType } from '../../models/types';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL="http://localhost:3000/api/auth/register" 
  constructor(private http: HttpClient) { 
   
  }
  saveToLocalStorage(data:any) {
    const userJson = JSON.stringify(data);

    localStorage.setItem('currentUser', userJson);
  }
  addUser(item: UserType) {

     this.http.post(this.apiURL, item).subscribe((response: any)=>{
      console.log(response);
      this.saveToLocalStorage(response)
     });
  }
  loginUser(user:UserType){
    const URL="http://localhost:3000/api/auth/login"
    this.http.post(URL, user).subscribe((response: any)=>{
      console.log(response);
      this.saveToLocalStorage(response)
     });
  }
  getFromLocalStorage() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      console.log(user);
       return {token:user.token, id:user.userId}
    }
    return {token:'',id:-1}
  }
  clearFromLocalStorage(){
    localStorage.removeItem('currentUser')
  }
  getUserDetails():Observable<UserType>{
    const {token,id}=this.getFromLocalStorage()
    const URL="http://localhost:3000/api/users/"+id
    
    const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    
    return this.http.get<UserType>(URL, { headers })

  }

   
}


