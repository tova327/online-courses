import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from '../../services/user service/user.service';
import { HttpClient } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { UserType } from '../../models/types';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
@Component({
  selector: 'app-user',

  imports: [MatFormFieldModule, MatInputModule, FormsModule,MatButtonModule,MatDividerModule,FormsModule,MatIconModule, MatSelectModule,MatCardModule,MatDialogTitle, MatDialogContent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  
  hide = true;
  
  errorMessage = 'required';
  constructor(private userService: UserService) {}
  
  user:UserType={
    name: '',
    email: '',
    password: '',
    role :"student"

  }
  signUpOn=false
  signUpClick(){
    if(this.signUpOn)
      this.signUpOn=false;
    else
      this.signUpOn=true;
  }
  isValidEmail(email: string): boolean {
    // Regular expression for validating an email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}
dielog=false
  onsubmit(){
    console.log("on submit");
    if(this.isValidEmail(this.user.email.toString())&&this.user.name&&this.user.name.length>0&&this.user.password.length>0){
      this.signUpOn=false
      console.log("on submit");
    }
    else{
      this.dielog=true
    }
    
  }
}
