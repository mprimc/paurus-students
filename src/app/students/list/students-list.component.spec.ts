import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StudentListComponent } from './students-list.component'
import { StudentService } from '../../../services/student.service'
import { of, throwError } from 'rxjs'
import { PaginatedResponse } from '../../../interfaces/pagination.interfaces'
import { Student } from '../../../interfaces/student.interfaces'
import { TableModule } from 'primeng/table'
import { SplitButton } from 'primeng/splitbutton'
import { provideRouter } from '@angular/router'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('StudentListComponent', () => {
  let component: StudentListComponent
  let fixture: ComponentFixture<StudentListComponent>
  let studentServiceSpy: jasmine.SpyObj<StudentService>

  beforeEach(async () => {
    const studentServiceMock = jasmine.createSpyObj('StudentService', ['getStudents'])

    await TestBed.configureTestingModule({
      imports: [TableModule, SplitButton, StudentListComponent], // ✅ Import standalone component
      providers: [{ provide: StudentService, useValue: studentServiceMock }, provideRouter([])],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(StudentListComponent)
    component = fixture.componentInstance
    studentServiceSpy = TestBed.inject(StudentService) as jasmine.SpyObj<StudentService>
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize with student data', () => {
    const mockResponse: PaginatedResponse<Student[]> = {
      result: [
        {
          uid: '700b835b-8415-451f-9106-8e417241f5e9',
          firstName: 'Cory',
          lastName: 'Jennings',
          age: 21,
          gender: 'Other',
          grade: 1,
          courses: ['Biology', 'Music', 'Art']
        }
      ],
      pagination: {
        totalRecords: 1,
        currentPage: 1,
        totalPages: 1,
        nextPage: null,
        previousPage: null
      }
    }
    studentServiceSpy.getStudents.and.returnValue(of(mockResponse))

    component.ngOnInit()
    fixture.detectChanges()

    expect(studentServiceSpy.getStudents).toHaveBeenCalledWith(1, 20)
    expect(component.students.length).toBe(1)
    expect(component.totalRecords).toBe(1)
  })

  it('should handle errors when fetching students', () => {
    studentServiceSpy.getStudents.and.returnValue(throwError(() => new Error('API Error')))

    component.fetchStudents(1)
    fixture.detectChanges()

    expect(studentServiceSpy.getStudents).toHaveBeenCalled()
    expect(component.loading).toBeFalse()
  })

  it('should update page when onPageChange is called', () => {
    spyOn(component, 'fetchStudents')
    const event = { first: 20, rows: 20 }

    component.onPageChange(event)

    expect(component.pageSize).toBe(20)
    expect(component.fetchStudents).toHaveBeenCalledWith(2)
  })
})
