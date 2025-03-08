import { Component, OnDestroy, OnInit } from '@angular/core';
import { TryComponent } from "../try/try.component";
import {MatTabsModule} from '@angular/material/tabs';
import { VisibilityService } from '../../services/visibility.service';
import { InApplayoutComponent } from "../in-applayout/in-applayout.component";
import { UserService } from '../../services/user service/user.service';
@Component({
  selector: 'app-app-layout',
  imports: [TryComponent, MatTabsModule,  InApplayoutComponent],
   
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent implements OnInit ,OnDestroy{
  isTryVisible: boolean = true;

  constructor(private visibilityService: VisibilityService,private userService:UserService) {}
  ngOnDestroy(): void {
    this.userService.clearFromLocalStorage()
  }

  ngOnInit(): void {
    this.visibilityService.isVisible$.subscribe(isVisible => {
      console.log('isTryVisible:', isVisible);
        this.isTryVisible = isVisible;
    });
  }

}
