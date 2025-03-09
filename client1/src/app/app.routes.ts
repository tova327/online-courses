import { Routes } from '@angular/router';
import { SingleCourseComponent } from '../components/single-course/single-course.component';
import { AppLayoutComponent } from '../components/app-layout/app-layout.component';
import { AllcoursesComponent } from '../components/allcourses/allcourses.component';
import { CourseManagementComponent } from '../components/course-management/course-management.component';
import { TryComponent } from '../components/try/try.component';
import { InnerAppLayoutComponent } from '../components/inner-app-layout/inner-app-layout.component';

export const routes: Routes = [
    { path: 'course/:courseId', component: SingleCourseComponent },
    { path: '', component: AppLayoutComponent },
    { path: 'courses', component: AllcoursesComponent },
    { path: 'manage-courses', component: CourseManagementComponent },
    { path: 'try', component: TryComponent },
  { path: 'inner-app', component: InnerAppLayoutComponent }
];
