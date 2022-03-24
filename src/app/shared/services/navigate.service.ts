import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  courseId!: string;
  lessonId!: string;

  constructor(private router: Router) { }

  goto(collection: string, courseId: string, lessonId?: string): void {
    const path =
      collection === 'lessons' ?
        ['courses', courseId, 'lessons', lessonId] :
        ['courses', courseId];
    this.router.navigate(path)
      .then()
      .catch((error: any) => console.log(error))
    ;
  }
}
