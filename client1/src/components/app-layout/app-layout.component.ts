import { Component, OnDestroy, OnInit } from '@angular/core';
import { TryComponent } from "../try/try.component";
import {MatTabsModule} from '@angular/material/tabs';
import { UserService } from '../../services/user service/user.service';
import { InnerAppLayoutComponent } from '../inner-app-layout/inner-app-layout.component';
@Component({
  selector: 'app-app-layout',
  imports: [TryComponent, MatTabsModule,InnerAppLayoutComponent],
   
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent implements OnInit ,OnDestroy{
  

  constructor(private userService:UserService) {}
  ngOnDestroy(): void {
    this.userService.clearFromLocalStorage()
  }

  ngOnInit(): void {
    
  }

}
