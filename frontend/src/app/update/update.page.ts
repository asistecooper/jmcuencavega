import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { StudentCrudService } from './../services/student.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})

export class UpdatePage implements OnInit {

  updateStudentFg: FormGroup;
  id: any;

  constructor(
    private studentCrudService: StudentCrudService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchStudent(this.id);
    this.updateStudentFg = this.formBuilder.group({
      name: [''],
      datebirth: [''],
      fathername: [''],
      mothername: [''],
      grade: [''],
      section: [''],
      dateadmission: ['']
    })
  }



  fetchStudent(id) {
    this.studentCrudService.getUser(id).subscribe((data) => {
      this.updateStudentFg.setValue({
        name: data['name'],
        datebirth: data['datebirth'],
        fathername: data['fathername'],
        mothername: data['mothername'],
        grade: data['grade'],
        section: data['section'],
        dateadmission: data['dateadmission']
      });
    });
  }

  onSubmit() {
    if (!this.updateStudentFg.valid) {
      return false;
    } else {
      this.studentCrudService.updateUser(this.id, this.updateStudentFg.value)
        .subscribe(() => {
          this.updateStudentFg.reset();
          this.router.navigate(['/list']);
        })
    }
  }

}
