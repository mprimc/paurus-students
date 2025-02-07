import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PaginatedResponse } from '../../../interfaces/pagination.interfaces'
import { Student } from '../../../interfaces/student.interfaces'
import { StudentService } from '../../../services/student.service'
import { TableModule } from 'primeng/table'
import { SplitButton } from 'primeng/splitbutton'
import { ButtonAction } from '../../../enums/actions'
import { MenuItem } from 'primeng/api'
import { ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'app-students-list',
  imports: [RouterOutlet, TableModule, SplitButton],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentListComponent {
  studentActions: MenuItem[] = [
    {
      label: ButtonAction.Edit,
      command: () => {
        this.selectStudentOption(ButtonAction.Edit)
      }
    },
    {
      label: ButtonAction.Delete,
      command: () => {
        this.selectStudentOption(ButtonAction.Delete)
      }
    }
  ]
  loading = false
  students: Student[] = []
  totalRecords = 0
  currentPage = 1
  pageSize = 20

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
        this.students = response.result
        this.totalRecords = response.pagination.totalRecords
        this.currentPage = response.pagination.currentPage
        this.cdRef.detectChanges()
        this.loading = false
      },
      error: (error) => {
        console.error('Error accrued when trying to fetch students data: ', error)
        this.loading = false
      }
    })
  }

  onPageChange(event: { first: number; rows: number }): void {
    this.pageSize = event.rows
    const page = event.first / event.rows
    this.fetchStudents(page + 1)
  }

  selectStudentOption(action: ButtonAction): void {
    console.log('option selected', action)
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
}
