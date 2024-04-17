import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Course } from '../model/course';
import { delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  private readonly API = '/api/courses'
  //private readonly API = '/assets/courses.json'
  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(1000),
      tap((courses)=>console.log(courses))
    );
  }

  loadById(id: string){
    this.httpClient.get<Course>(`${this.API}/${id}`);

  }

  findById(id: string){
    return this.httpClient.get<Course>(`$/{this.API}/${id}`);
  }

  save(record: Partial<Course>){
    console.log('record')
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

}
