import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user service/user.service';
import { Router, RouterOutlet } from '@angular/router';
import { TryComponent } from '../try/try.component';
import { InnerAppLayoutComponent } from '../inner-app-layout/inner-app-layout.component';

@Component({
  selector: 'app-app-layout',
  imports: [TryComponent, InnerAppLayoutComponent,RouterOutlet],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  isLoggedIn = false; // Initial login status

  constructor(private userService: UserService, private router: Router) {}

  ngOnDestroy(): void {
    this.userService.clearFromLocalStorage();
  }

  ngOnInit(): void {
    console.log("is in "+this.isLoggedIn);
    
    this.isLoggedIn = this.userService.isLoggedIn();
    console.log("is in "+this.isLoggedIn);
    this.router.navigate(['/try'])
  }

  login() {
    this.isLoggedIn = true;
    this.router.navigate(['/inner-app']);
  }
}