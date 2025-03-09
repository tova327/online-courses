import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user service/user.service';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UserType } from '../../models/types';

@Component({
  selector: 'app-try',
  standalone:true,
  imports: [MatFormField, MatLabel, MatSelect, MatOption, ReactiveFormsModule, MatInputModule],
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.css']
})
export class TryComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('loginTemplate') loginTemplate!: TemplateRef<any>;
  
  registerForm: FormGroup;
  loginForm: FormGroup;
  user: UserType | undefined;
  isIn: boolean = false;
  isTeacher: boolean = false;
  private dialogRef: MatDialogRef<any> | null = null; // Store the dialog reference

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private dialog: MatDialog,
    
  ) {
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
    this.dialogRef = this.dialog.open(this.dialogTemplate); // Store the reference
  }

  openSignIn() {
    this.dialogRef = this.dialog.open(this.loginTemplate); // Store the reference
  }

  signIn() {
    this.openSignIn();
  }

  onSubmit() {
    console.log("on submit");
    
    if (this.registerForm.valid) {
      console.log("valid");
      const role = this.registerForm.get('role')?.value;
      if (role !== 'student') {
        this.isTeacher = true;
      }
      this.userService.addUser(this.registerForm.value);
      this.isIn = true; // Handle successful registration
       // Hide the TryComponent
      if (this.dialogRef) {
        this.dialogRef.close(); // Close the dialog
      }
    }
  }

  onLoginSubmit() {
    console.log("Login submit");

    if (this.loginForm.valid) {
      console.log("Login valid");
      this.userService.loginUser(this.loginForm.value);
      this.userService.getUserDetails().subscribe(data => {
        this.user = data;
        if (this.user.role && this.user.role !== 'student') {
          this.isTeacher = true;
        }
      });
      this.isIn = true; // Handle successful login
       // Hide the TryComponent
      if (this.dialogRef) {
        this.dialogRef.close(); // Close the dialog
      }
    }
  }
}
