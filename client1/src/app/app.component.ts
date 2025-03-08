import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from "../components/user/user.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TryComponent } from "../components/try/try.component";
import { AppLayoutComponent } from "../components/app-layout/app-layout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, TryComponent, FormsModule, AppLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
