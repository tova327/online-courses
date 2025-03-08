import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
@Component({
  selector: 'app-single-lesson',
  imports: [MatCardHeader, MatCardTitle,MatCardContent,MatCard],
  templateUrl: './single-lesson.component.html',
  styleUrl: './single-lesson.component.css'
})
export class SingleLessonComponent {
  @Input() title!: string; // Title of the lesson
  @Input() content!: string; // Content of the lesson
}
