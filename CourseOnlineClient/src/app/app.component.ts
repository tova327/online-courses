import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GetinComponent } from '../conponents/getin/getin.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,GetinComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CourseOnlineClient';
}
