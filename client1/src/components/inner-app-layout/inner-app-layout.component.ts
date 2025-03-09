import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role-service.service';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { AllcoursesComponent } from '../allcourses/allcourses.component';
import { CourseManagementComponent } from '../course-management/course-management.component';


@Component({
  selector: 'app-inner-app-layout',
  imports:[MatTab,MatTabGroup,AllcoursesComponent,CourseManagementComponent],
  templateUrl: './inner-app-layout.component.html',
  styleUrls: ['./inner-app-layout.component.css']
})
export class InnerAppLayoutComponent implements OnInit {
  userRole: string = 'student'; // Default role
  showCourseManagement: boolean = false; // Flag to show Course Management tab

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.roleService.currentRole.subscribe(role => {
      this.userRole = role;
      this.showCourseManagement = this.userRole !== 'student'; // Show Course Management if not a student
    });
  }
}
