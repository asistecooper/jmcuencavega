import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { StudentCrudService } from './../services/student.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {

  studentForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private studentCrudService: StudentCrudService
  ) {
    this.studentForm = this.formBuilder.group({
      name: [''],
      datebirth: [''],
      fathername: [''],
      mothername: [''],
      grade: [''],
      section: [''],
      dateadmission: ['']
    })
  }

  ngOnInit() { }

  onSubmit() {
    if (!this.studentForm.valid) {
      return false;
    } else {
      this.studentCrudService.createUser(this.studentForm.value)
        .subscribe((response) => {
          this.zone.run(() => {
            this.studentForm.reset();
            this.router.navigate(['/list']);
          })
        });
    }
  }

}
