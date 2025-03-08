import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user service/user.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UserType } from '../../models/types';

@Component({
  selector: 'app-try',
  imports: [MatFormField, MatLabel, MatSelect, MatOption, ReactiveFormsModule, MatInputModule],
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.css']
})
export class TryComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('loginTemplate') loginTemplate!: TemplateRef<any>;
  @Input() close:Function
  @Input() isTeacher:Function
  registerForm: FormGroup;
  loginForm: FormGroup;
  user:UserType|undefined

  constructor(private fb: FormBuilder, private userService: UserService, private dialog: MatDialog) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  openSignUp() {
    this.dialog.open(this.dialogTemplate);
  }

  openSignIn() {
    this.dialog.open(this.loginTemplate);
  }

  signIn() {
    this.openSignIn();
  }

  onSubmit() {
    console.log("on submit");
    
    if (this.registerForm.valid) {
      console.log("valid");
      const role = this.registerForm.get('role')?.value;
      if(role!=='student'){
        this.isTeacher()
      }
      this.userService.addUser(this.registerForm.value);
      this.close()// Handle successful registration
    }
  }

  onLoginSubmit() {
    console.log("Login submit");

    if (this.loginForm.valid) {
      console.log("Login valid");
      this.userService.loginUser(this.loginForm.value);
      const userDetails=this.userService.getUserDetails()
      this.userService.getUserDetails().subscribe(data=>{this.user=data
        if(this.user.role&&this.user.role!=='student'){
          this.isTeacher()
        }
      })
      this.close()// Handle successful login
    }
  }
}
