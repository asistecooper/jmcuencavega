import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Student {
  _id: number;
  name: string;
  datebirth: string;
  fathername: string;
  mothername: string;
  grade: string;
  section: string;
  dateadmission: string;

}

@Injectable({
  providedIn: 'root'
})

export class StudentCrudService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  createUser(student: Student): Observable<any> {
    return this.httpClient.post<Student>('http://localhost:5000/api/create-student', student, this.httpOptions)
      .pipe(
        catchError(this.handleError<Student>('Error occured'))
      );
  }

  getUser(id): Observable<Student[]> {
    return this.httpClient.get<Student[]>('http://localhost:5000/api/fetch-student/' + id)
      .pipe(
        tap(_ => console.log(`Student fetched: ${id}`)),
        catchError(this.handleError<Student[]>(`Get student id=${id}`))
      );
  }

  getUsers(): Observable<Student[]> {
    return this.httpClient.get<Student[]>('http://localhost:5000/api')
      .pipe(
        tap(users => console.log('Users retrieved!')),
        catchError(this.handleError<Student[]>('Get student', []))
      );
  }

  updateUser(id, student: Student): Observable<any> {
    return this.httpClient.put('http://localhost:5000/api/update-student/' + id, student, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Student updated: ${id}`)),
        catchError(this.handleError<Student[]>('Update student'))
    )
  }

  deleteUser(id): Observable<Student[]> {
    return this.httpClient.delete<Student[]>('http://localhost:5000/api/delete-student/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Student deleted: ${id}`)),
        catchError(this.handleError<Student[]>('Delete student'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
