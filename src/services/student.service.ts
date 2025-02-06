import { PaginatedResponse } from './../interfaces/pagination.interfaces'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'
import { Student } from '../interfaces/student.interfaces'
import { JsonReaderService } from '../network/json-reader.service'

@Injectable({ providedIn: 'root' })
export class StudentService {
  private deletedStudentUIDs: Student['uid'][] = []
  private addedStudents: Student[] = []
  private updatedStudents: Record<Student['uid'], Student> = {}

  constructor(private jsonReaderService: JsonReaderService) {}

  getStudents(page: number, pageSize: number): Observable<PaginatedResponse<Student[]>> {
    return this.jsonReaderService.getStudentsData().pipe(
      map((students) => {
        // NOTE: this manipulation should be done via backend API!
        // filtering students, adding new students to the list, apply student changes
        students = students
          .filter((el) => !this.deletedStudentUIDs.includes(el.uid))
          .concat(this.addedStudents)
          .map((el) => {
            const updatedStudent = this.updatedStudents[el.uid]
            if (updatedStudent) {
              return updatedStudent
            } else {
              return el
            }
          })

        const totalRecords = students.length
        const totalPages = Math.ceil(students.length / pageSize)
        const nextPage = page + 1 <= totalPages ? page + 1 : null
        const previousPage = page - 1 > 0 ? page - 1 : null

        const studentsResponse = students.slice((page - 1) * pageSize, page * pageSize)
        // NOTE: pagination should be supported via backend API!
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

  addStudent(student: Omit<Student, 'uid'>): void {
    this.addedStudents.push({ ...student, uid: uuidv4() })
  }

  updateStudent(student: Student): void {
    this.updatedStudents[student.uid] = student
  }

  deleteStudent(uid: Student['uid']): void {
    this.deletedStudentUIDs.push(uid)
  }
}
