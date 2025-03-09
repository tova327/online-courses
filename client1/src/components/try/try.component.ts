import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user service/user.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UserType } from '../../models/types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Import Router
import { RoleService } from '../../services/role-service.service';

@Component({
  selector: 'app-try',
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
  private dialogRef: MatDialogRef<any> | null = null;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private dialog: MatDialog,
    
    private snackBar: MatSnackBar,
    private roleService: RoleService,
    private router: Router // Inject Router
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
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  openSignIn() {
    this.dialogRef = this.dialog.open(this.loginTemplate);
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const role = this.registerForm.get('role')?.value;
      this.roleService.changeRole(role); // Update role in RoleService
      try {
        await this.userService.addUser(this.registerForm.value);
       
        this.router.navigate(['/inner-app']); // Navigate to InnerAppLayoutComponent
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      } catch (error) {
        this.openSnackBar("Registration failed! Please try again.");
      }
    }
  }

  async onLoginSubmit() {
    if (this.loginForm.valid) {
      try {
        await this.userService.loginUser(this.loginForm.value);
        const data = await this.userService.getUserDetails().toPromise();
        this.user = data;
        this.roleService.changeRole(this.user.role); // Update role in RoleService
        
        this.router.navigate(['/inner-app']); // Navigate to InnerAppLayoutComponent
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      } catch (error) {
        this.openSnackBar("Login failed! Please try again.");
      }
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}