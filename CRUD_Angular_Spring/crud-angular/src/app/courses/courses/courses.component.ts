import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;

  displayedColumns = ['_id','name', 'category', 'actions'];

  constructor(
    private CoursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private router_: ActivatedRoute
    ){
  this.courses$ = this.CoursesService.list()
    .pipe(
      catchError(error => {
        this.onError('erro ao carregar cursos')
        return of([])
      })
    );
  }

  onError(erroMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
       data: erroMsg
    });
  }

  ngOnInit(){
  }

  ondAdd() {
    this.router.navigate(['new'], {relativeTo: this.router_});
    }

}
