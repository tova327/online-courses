import { Component } from '@angular/core';
import { AllcoursesComponent } from '../allcourses/allcourses.component';
import { TryComponent } from "../try/try.component";
import {MatTabsModule} from '@angular/material/tabs';
import { CourseManagementComponent } from "../course-management/course-management.component";
@Component({
  selector: 'app-app-layout',
  imports: [TryComponent, MatTabsModule, AllcoursesComponent, CourseManagementComponent],
   
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {
  isIn:boolean=false
  isTeacher:boolean=false
  comeIn(){
    console.log("comein");
    
    this.isIn=true
  }
  changeIsTeacher(){
    console.log("isteacher");
    this.isTeacher=true
  }

}
