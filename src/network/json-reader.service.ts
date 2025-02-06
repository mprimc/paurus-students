import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Student } from '../interfaces/student.interface'

@Injectable({
  providedIn: 'root'
})
export class JsonReaderService {
  private jsonUrl = 'assets/students.json'

  constructor(private http: HttpClient) {}

  // NOTE: this data should be fetch via proper HTTP api
  getStudentsData(): Observable<Student[]> {
    return this.http.get<Student[]>(this.jsonUrl)
  }
}
