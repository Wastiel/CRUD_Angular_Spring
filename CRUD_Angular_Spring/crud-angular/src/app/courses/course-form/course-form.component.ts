import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{

  form: FormGroup
  constructor(private formBuilder: FormBuilder,
              private service: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location){
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  ngOnInit(){

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
    this.snackBar.open('Erro ao salvar curso','' , {duration: 5000} )
  }

  private onSuccess(){
    this.snackBar.open('Curso Salvo com sucesso','' , {duration: 5000} )
  }
}
