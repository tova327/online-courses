import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppLayoutComponent } from "../components/app-layout/app-layout.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AppLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'online courses';
}