import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Course } from '../model/course';
import { delay, first, take, tap } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

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
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>){
    console.log('record')
    //logica para teste update
    if(record._id){
      console.log('update')
     return this.update(record);
    }
    //logica para teste update
    console.log('create')
    return this.create(record);
  }
  private create(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

}
