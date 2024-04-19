import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{

  form = this.formBuilder.group({
    //name: new FormControl<string|null>(null),
    //name: new FormControl<string>(''),
    _id: [''],
    name: [''],
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
              private service: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute){
  }

  ngOnInit(){
    // maneira de colocar o value dentro do name da mesma maneira.
    // this.form.value.name = '';
    const course: Course = this.route.snapshot.data['course'];
    console.log
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
    })
  }

  onCancel() {
    console.log('onCancel')
    this.location.back();
  }

  onSubmit() {
    console.log(this.form.value)
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso','' , {duration: 1000} )
  }

  private onSuccess(){
    this.snackBar.open('Curso Salvo com sucesso','' , {duration: 1000} )
  }
}
