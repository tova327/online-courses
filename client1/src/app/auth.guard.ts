import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private appComponent: AppComponent, private router: Router) {}

  canActivate(): boolean {
    if (this.appComponent.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['try']);//
      return false;
    }
  }
}