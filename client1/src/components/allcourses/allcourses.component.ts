import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course service/course.service';
import { CourseType } from '../../models/types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-allcourses',
  imports: [AsyncPipe, RouterModule, MatListModule, MatCardActions,MatButton],
  templateUrl: './allcourses.component.html',
  styleUrl: './allcourses.component.css'
})
export class AllcoursesComponent implements OnInit{
id: (id: string) => void;

  constructor(private courseService:CourseService){}
  courses$:Observable<CourseType[]>
  joinCourse(id:number){
    this.courseService.joinCourse(id)
  }
  leaveCourse(id:number){
    this.courseService.leaveCourse(id)
  }
  ngOnInit(){
    this.courses$ = this.courseService.courses$;
    this.courseService.getAll();
  }
}
