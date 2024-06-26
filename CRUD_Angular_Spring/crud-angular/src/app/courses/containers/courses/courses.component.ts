import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null;

  displayedColumns = ['_id','name', 'category', 'actions'];

  constructor(
    private CoursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private router_: ActivatedRoute,
    private snackBar: MatSnackBar
    ){
      this.refresh();
  }

  onError(erroMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
       data: erroMsg
    });
  }

  ngOnInit(){
  }

  refresh(){
    this.courses$ = this.CoursesService.list()
    .pipe(
      catchError(error => {
        this.onError('erro ao carregar cursos')
        return of([])
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.router_});
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course._id], {relativeTo: this.router_});
  }
  onRemove(course: Course){

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'Tem certeza que deseja remover este curso?',
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if(result){
          this.CoursesService.remove(course._id).subscribe(
            () => {
              this.refresh();
              this.snackBar.open('Curso removido com sucesso', 'X' , {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            },
            () => this.onError('Erro ao tentar remover este curso')
          );
        }
      });
  }

}
