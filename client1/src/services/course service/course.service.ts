import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user service/user.service';
import { CourseType, LessonType } from '../../models/types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  localURL="http://localhost:3000/api/courses"
  constructor(private http: HttpClient,private userService:UserService) { }
  private coursesSubject : BehaviorSubject<CourseType[]> = new BehaviorSubject<CourseType[]>([]);
  public courses$ = this.coursesSubject.asObservable();
  getAll(){
    const token=this.userService.getFromLocalStorage().token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

   this.http.get<CourseType[]>(this.localURL, { headers }).subscribe(data=>this.coursesSubject.next(data))
  }
  getCourseById(id:number):Observable<CourseType>{
    const URL=`http://localhost:3000/api/courses/${id}` 
    const token=this.userService.getFromLocalStorage().token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

   return this.http.get<CourseType>(URL, { headers })

  }

   
  joinCourse(idCourse:number){
    
    const {token, id:userId}=this.userService.getFromLocalStorage()

    const URL=`http://localhost:3000/api/courses/${idCourse}/enroll`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    this.http.post<any>(URL, {userId:userId}, { headers }).subscribe((response)=>{
      console.log(response);
      
    });

  }
  leaveCourse(idCourse:number){
    const {token, id:userId}=this.userService.getFromLocalStorage()

    const URL=`http://localhost:3000/api/courses/${idCourse}/unenroll`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const data={userId: userId}
    this.http.delete<any>(URL, {headers:headers,body:data
    }).subscribe((response)=>{
      console.log(response);
      
    });
    
  }

  getLessons(courseId:number):Observable<LessonType[]>{
    const {token}=this.userService.getFromLocalStorage()
    const URL=`http://localhost:3000/api/courses/${courseId}/lessons`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

   return this.http.get<LessonType[]>(URL, { headers })
  }

  newCourse(title:string,description:string){
    const URL="http://localhost:3000/api/courses"
    const {token,id}=this.userService.getFromLocalStorage()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const data={title: title,description:description,teacherId:id}
    this.http.post<any>(URL, {headers:headers,body:data
    }).subscribe((response)=>{
      console.log(response);
    });

  }

  updateCourse(title:string,description:string,courseId:number){
    const URL=`http://localhost:3000/api/courses/${courseId}`
    const {token,id}=this.userService.getFromLocalStorage()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const data={title: title,description:description,teacherId:id}
    this.http.put<any>(URL, {headers:headers,body:data
    }).subscribe((response)=>{
      console.log(response);
    });
  }

  deleteCourse(courseId:number){
    const {token}=this.userService.getFromLocalStorage()
    const URL=`http://localhost:3000/api/courses/${courseId}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(URL, { headers }).subscribe((data)=>console.log(data))
  }

  newLesson(courseId:number,title:string,content:string){
    const URL=`http://localhost:3000/api/courses/${courseId}/lessons`
    const {token}=this.userService.getFromLocalStorage()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const data={title: title,content:content,courseId:courseId}
    this.http.post<any>(URL, {headers:headers,body:data
    }).subscribe((response)=>{
      console.log(response);
    });
  }

  updateLesson(title:string,content:string,courseId:number,lessonId:number){
    const URL=`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`
    const {token}=this.userService.getFromLocalStorage()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const data={title: title,content:content,courseId:courseId}
    this.http.put<any>(URL, {headers:headers,body:data
    }).subscribe((response)=>{
      console.log(response);
    });
  }

  deleteLesson(courseId:number,lessonId:number){
    const {token}=this.userService.getFromLocalStorage()
    const URL=`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(URL, { headers }).subscribe((data)=>console.log(data))
  }

}
