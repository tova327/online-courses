import { Component, Input, OnInit } from '@angular/core';
import { MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { CourseService } from '../../services/course service/course.service';
import { CourseType, LessonType } from '../../models/types';
import { ActivatedRoute } from '@angular/router';
import { MatList, MatListItem } from '@angular/material/list';
@Component({
  selector: 'app-single-course',
  imports: [MatCardHeader, MatCardSubtitle, MatCardTitle,MatCardContent,MatList,MatListItem],
  templateUrl: './single-course.component.html',
  styleUrl: './single-course.component.css'
})
export class SingleCourseComponent implements OnInit{
  
  courseId!: number; // Course ID
  

  lessons:LessonType[]
  course:CourseType
  constructor(private courseService:CourseService,private route: ActivatedRoute) {
  }
  ngOnInit(){
    this.route.paramMap.subscribe((params) => {
      const id = params.get('courseId');
      if (id) {
        this.courseId = +id;

        this.courseService.getCourseById(this.courseId).subscribe((data)=>this.course=data)
        this.courseService.getLessons(this.courseId).subscribe((data)=>this.lessons=data)
      } else {
        console.error('Product ID not found');
      }
    });
  }

}
