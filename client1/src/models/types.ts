export type UserType = {
    name?: String,
    email: String,
    password: String,
    role?: "student" | "teacher" | "admin"

}

export type CourseType={
    id:number,
    title:string,
    description:string,
    teacherId:number
}

export type LessonType={
    id:number,
    title:string,
    content:string,
    courseId:number
}