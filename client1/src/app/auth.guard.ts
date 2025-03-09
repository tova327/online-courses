import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from '../components/app-layout/app-layout.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private appComponent: AppLayoutComponent, private router: Router) {}

  canActivate(): boolean {
    if (this.appComponent.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['try']);
      return false;
    }
  }
}