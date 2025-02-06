import { PaginatedResponse } from './../interfaces/pagination.interfaces'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Student } from '../interfaces/student.interfaces'

@Injectable({
  providedIn: 'root'
})
export class JsonReaderService {
  private jsonUrl = 'assets/students.json'

  constructor(private http: HttpClient) {}

  // NOTE: this data should be fetch via proper HTTP api
  getStudentsData(
    page: number,
    pageSize: number,
    uidFilter: string[]
  ): Observable<PaginatedResponse<Student[]>> {
    return this.http.get<Student[]>(this.jsonUrl).pipe(
      map((students) => {
        const filteredStudents = students.filter((el) => !uidFilter.includes(el.uid))
        const totalRecords = filteredStudents.length
        const totalPages = Math.round(filteredStudents.length / pageSize)
        const nextPage = page + 1 <= totalPages ? page + 1 : null
        const previousPage = page - 1 > 0 ? page - 1 : null

        const studentsResponse = filteredStudents.slice((page - 1) * pageSize, page * pageSize)
        const paginatedResponse: PaginatedResponse<Student[]> = {
          result: studentsResponse,
          pagination: {
            totalRecords,
            currentPage: page,
            totalPages,
            nextPage,
            previousPage
          }
        }
        return paginatedResponse
      })
    )
  }
}
