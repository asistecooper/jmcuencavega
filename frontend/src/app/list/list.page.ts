
import { Component, OnInit } from '@angular/core';
import { StudentCrudService } from './../services/student.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {

  Students: any = [];

  constructor( private studentCrudService: StudentCrudService ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.studentCrudService.getUsers().subscribe((response) => {
      this.Students = response;
    })
  }

  removeStudent(student, i) {
    if (window.confirm('Quieres eliminarlo?')) {
      this.studentCrudService.deleteUser(student._id)
      .subscribe(() => {
          this.Students.splice(i, 1);
          console.log('Studetns deleted!')
        }
      )
    }
  }

}
