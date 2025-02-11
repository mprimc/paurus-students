import { Component, OnInit } from '@angular/core'
import { PaginatedResponse } from '../../../interfaces/pagination.interfaces'
import { Student, StudentMenuItem } from '../../../interfaces/student.interfaces'
import { StudentService } from '../../../services/student.service'
import { ButtonAction } from '../../../enums/actions'
import { MenuItem } from 'primeng/api'
import { ChangeDetectorRef } from '@angular/core'

@Component({
  standalone: false,
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentListComponent implements OnInit {
  loading = false
  students: StudentMenuItem[] = []
  totalRecords = 0
  currentPage = 1
  pageSize = 20
  updatedStudent: Student | null = null
  displayStudentForm = false

  constructor(
    private cdRef: ChangeDetectorRef,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.fetchStudents(1)
  }

  fetchStudents(page: number): void {
    this.loading = true
    this.studentService.getStudents(page, this.pageSize).subscribe({
      next: (response: PaginatedResponse<Student[]>) => {
        this.students = response.result.map((student) => ({
          ...student,
          actionOptions: this.createStudentActions(student)
        }))
        this.totalRecords = response.pagination.totalRecords
        this.currentPage = response.pagination.currentPage
        this.cdRef.detectChanges()
        this.loading = false
      },
      error: (error: any) => {
        console.error('Error accrued when trying to fetch students data: ', error)
        this.loading = false
      }
    })
  }

  private createStudentActions(student: Student): MenuItem[] {
    return [
      {
        label: ButtonAction.Edit,
        command: () => {
          this.selectStudentOption(ButtonAction.Edit, student)
        }
      },
      {
        label: ButtonAction.Delete,
        command: () => {
          this.selectStudentOption(ButtonAction.Delete, student)
        }
      }
    ]
  }

  selectStudentOption(action: ButtonAction, bondedData: any): void {
    const student = bondedData as StudentMenuItem
    if (action === ButtonAction.Edit) {
      this.openEditStudentForm(student)
    } else if (action === ButtonAction.Delete) {
      this.studentService.deleteStudent(student.uid)
      this.fetchStudents(this.currentPage)
    } else {
      console.log('Unsupported student action ', action)
    }
  }

  onPageChange(event: { first: number; rows: number }): void {
    this.pageSize = event.rows
    const page = event.first / event.rows
    this.fetchStudents(page + 1)
  }
  customSort(event: any) {
    const field = event.field
    const order = event.order

    this.students.sort((a: any, b: any) => {
      let value1 = a[field]
      let value2 = b[field]

      if (typeof value1 === 'string') {
        return order * value1.localeCompare(value2)
      } else if (typeof value1 === 'object') {
        return order * value1.join(',').localeCompare(value2.join(','))
      } else {
        return order * (value1 - value2)
      }
    })

    // Force change detection
    this.students = [...this.students]
    this.cdRef.detectChanges()
  }

  openAddStudentForm() {
    this.updatedStudent = null
    this.displayStudentForm = true
  }

  openEditStudentForm(student: Student) {
    this.updatedStudent = { ...student }
    this.displayStudentForm = true
  }

  saveStudent(student: Student) {
    if (this.updatedStudent) {
      this.studentService.updateStudent(student)
    } else {
      this.studentService.addStudent(student)
    }
    this.fetchStudents(this.currentPage)
    this.displayStudentForm = false
  }

  closeForm() {
    this.displayStudentForm = false
  }
}
