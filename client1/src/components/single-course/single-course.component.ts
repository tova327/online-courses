import { Component, Input, OnInit } from '@angular/core';
import { MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { CourseService } from '../../services/course service/course.service';
import { CourseType, LessonType } from '../../models/types';
import { ActivatedRoute } from '@angular/router';
import { MatList, MatListItem } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBar for error messages

@Component({
  selector: 'app-single-course',
  imports: [MatCardHeader, MatCardSubtitle, MatCardTitle, MatCardContent, MatList, MatListItem,MatSnackBarModule],
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css'] // Corrected styleUrl to styleUrls
})
export class SingleCourseComponent implements OnInit {
  
  courseId!: number; // Course ID
  lessons: LessonType[] = []; // Initialize lessons
  course: CourseType | undefined; // Initialize course

  constructor(private courseService: CourseService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('courseId');
      if (id) {
        this.courseId = +id;

        try {
          this.course = await this.courseService.getCourseById(this.courseId).toPromise(); // Convert Observable to Promise
          this.lessons = await this.courseService.getLessons(this.courseId).toPromise(); // Convert Observable to Promise
        } catch (error) {
          this.openSnackBar("Failed to load course details. Please try again."); // Show error message
        }
      } else {
        console.error('Course ID not found');
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
