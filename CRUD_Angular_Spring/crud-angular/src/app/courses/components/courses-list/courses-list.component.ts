import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false)

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor( private router: Router,
    private router_: ActivatedRoute){
  }

  ngOnInit(): void{
  }

  onAdd() {
    //this.router.navigate(['new'], {relativeTo: this.router_});
    this.add.emit(true);
    }

}