import { Component } from '@angular/core';
import { UserService } from '../../servises/user.service';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-getin',
  standalone: true,
  imports: [MatButtonModule, HttpClientModule],
  templateUrl: './getin.component.html',
  styleUrl: './getin.component.css'
})
export class GetinComponent {
  constructor(private userService: UserService) {}
  //this.userService.adduser().subscribe();

}
