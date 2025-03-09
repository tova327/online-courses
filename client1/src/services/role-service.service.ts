import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleSource = new BehaviorSubject<string>('student'); // Default role
  currentRole = this.roleSource.asObservable();

  changeRole(role: string) {
    this.roleSource.next(role);
  }
}

