import { Component, OnInit } from '@angular/core';
import { CourseType, LessonType } from '../../models/types';
import { CourseService } from '../../services/course service/course.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-course-management',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButton],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit {
  courses: CourseType[] = [];
  selectedCourseId: number | null = null;
  courseForm: FormGroup;
  lessonForm: FormGroup;
  lessons: LessonType[] = [];

  constructor(private courseService: CourseService, private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: [''],
      description: ['']
    });

    this.lessonForm = this.fb.group({
      title: [''],
      content: ['']
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAll();
    this.courseService.courses$.subscribe(courses => {
      this.courses = courses;
    });
  }

  createCourse() {
    const { title, description } = this.courseForm.value;
    this.courseService.newCourse(title, description);
    this.courseForm.reset();
    this.loadCourses();
  }

  updateCourse(courseId: number) {
    const { title, description } = this.courseForm.value;
    this.courseService.updateCourse(title, description, courseId);
    this.loadCourses();
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId);
    this.loadCourses();
  }

  selectCourse(courseId: number) {
    this.selectedCourseId = courseId;
    this.courseService.getLessons(courseId).subscribe(lessons => {
      this.lessons = lessons;
    });
  }

  createLesson() {
    if (this.selectedCourseId !== null) {
      const { title, content } = this.lessonForm.value;
      this.courseService.newLesson(this.selectedCourseId, title, content);
      this.lessonForm.reset();
      this.selectCourse(this.selectedCourseId); // Refresh lessons
    }
  }

  updateLesson(lessonId: number) {
    if (this.selectedCourseId !== null) {
      const { title, content } = this.lessonForm.value;
      this.courseService.updateLesson(title, content, this.selectedCourseId, lessonId);
      this.selectCourse(this.selectedCourseId); // Refresh lessons
    }
  }

  deleteLesson(lessonId: number) {
    if (this.selectedCourseId !== null) {
      this.courseService.deleteLesson(this.selectedCourseId, lessonId);
      this.selectCourse(this.selectedCourseId); // Refresh lessons
    }
  }
}