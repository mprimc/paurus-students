import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StudentListComponent } from './students-list.component'
import { StudentService } from '../../../services/student.service'
import { of, throwError } from 'rxjs'
import { ChangeDetectorRef } from '@angular/core'
import { PaginatedResponse } from '../../../interfaces/pagination.interfaces'
import { Student } from '../../../interfaces/student.interfaces'
import { ButtonAction } from '../../../enums/actions'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import { RouterModule } from '@angular/router'
import { DialogModule } from 'primeng/dialog'
import { SplitButtonModule } from 'primeng/splitbutton'
import { StudentFormComponent } from '../form/student-form.component'
import { SplitButtonComponent } from '../../../widgets/split.button.component'
import { SelectModule } from 'primeng/select'
import { CheckboxModule } from 'primeng/checkbox'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { ButtonComponent } from '../../../widgets/button.component'
import { InputNumberComponent } from '../../../widgets/input-number.component'
import { InputTextComponent } from '../../../widgets/input-text.component'
import { CheckboxComponent } from '../../../widgets/checkbox.component'
import { SelectComponent } from '../../../widgets/select.component'
import { ReactiveFormsModule } from '@angular/forms'

describe('StudentListComponent', () => {
  let component: StudentListComponent
  let fixture: ComponentFixture<StudentListComponent>
  let studentServiceMock: jasmine.SpyObj<StudentService>
  let cdRefMock: jasmine.SpyObj<ChangeDetectorRef>

  beforeEach(async () => {
    studentServiceMock = jasmine.createSpyObj('StudentService', [
      'getStudents',
      'deleteStudent',
      'updateStudent',
      'addStudent'
    ])
    cdRefMock = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges'])

    studentServiceMock.getStudents.and.returnValue(throwError(() => new Error('API Error')))

    await TestBed.configureTestingModule({
      declarations: [StudentListComponent, StudentFormComponent],
      imports: [
        TableModule,
        ButtonModule,
        MenuModule,
        RouterModule.forRoot([]),
        DialogModule,
        SplitButtonModule,
        DropdownModule,
        SplitButtonComponent,
        SelectModule,
        CheckboxModule,
        InputTextModule,
        SplitButtonComponent,
        ButtonComponent,
        InputNumberComponent,
        InputTextComponent,
        SplitButtonComponent,
        CheckboxComponent,
        SelectComponent,
        ReactiveFormsModule
      ],
      providers: [
        { provide: StudentService, useValue: studentServiceMock },
        { provide: ChangeDetectorRef, useValue: cdRefMock }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(StudentListComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch students on init', () => {
    const mockResponse: PaginatedResponse<Student[]> = {
      result: [
        {
          uid: '700b835b-8415-451f-9106-8e417241f5e9',
          firstName: 'Cory',
          lastName: 'Jennings',
          age: 21,
          gender: 'Other',
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
    studentServiceMock.getStudents.and.returnValue(of(mockResponse))

    component.ngOnInit()

    expect(component.students.length).toBe(1)
    expect(component.totalRecords).toBe(1)
    expect(studentServiceMock.getStudents).toHaveBeenCalledWith(1, component.pageSize)
  })

  it('should handle fetchStudents error', () => {
    studentServiceMock.getStudents.and.returnValue(throwError(() => new Error('API Error')))

    component.fetchStudents(1)

    expect(studentServiceMock.getStudents).toHaveBeenCalled()
    expect(component.loading).toBeFalse()
  })

  it('should delete a student and refresh the list', () => {
    studentServiceMock.deleteStudent.and.callFake(() => {
      return of(null) as unknown as void
    })
    spyOn(component, 'fetchStudents')

    component.selectStudentOption(ButtonAction.Delete, { uid: '1' })

    expect(studentServiceMock.deleteStudent).toHaveBeenCalledWith('1')
    expect(component.fetchStudents).toHaveBeenCalled()
  })

  it('should open the edit student form', () => {
    const student = {
      uid: '700b835b-8415-451f-9106-8e417241f5e9',
      firstName: 'Updated Cory',
      lastName: 'Jennings',
      age: 21,
      gender: 'Other',
      courses: ['Biology', 'Music', 'Art']
    }

    component.openEditStudentForm(student)

    expect(component.updatedStudent).toEqual(student)
    expect(component.displayStudentForm).toBeTrue()
  })

  it('should update student and refresh the list', () => {
    studentServiceMock.updateStudent.and.callFake(() => {
      return of(null) as unknown as void
    })
    spyOn(component, 'fetchStudents')

    const student = {
      uid: '700b835b-8415-451f-9106-8e417241f5e9',
      firstName: 'Updated Cory',
      lastName: 'Jennings',
      age: 21,
      gender: 'Other',
      courses: ['Biology', 'Music', 'Art']
    }
    component.updatedStudent = student
    component.saveStudent(student)

    expect(studentServiceMock.updateStudent).toHaveBeenCalledWith(student)
    expect(component.fetchStudents).toHaveBeenCalled()
    expect(component.displayStudentForm).toBeFalse()
  })

  it('should add a student and refresh the list', () => {
    studentServiceMock.addStudent.and.callFake(() => {
      return of(null) as unknown as void
    })
    spyOn(component, 'fetchStudents')

    const student = {
      uid: '2fb0b07e-c1e0-4343-aadc-b151431cad2a',
      firstName: 'Amy',
      lastName: 'Levine',
      age: 22,
      gender: 'Male',
      courses: ['History', 'Science', 'Art', 'English']
    }
    component.updatedStudent = null
    component.saveStudent(student)

    expect(studentServiceMock.addStudent).toHaveBeenCalledWith(student)
    expect(component.fetchStudents).toHaveBeenCalled()
    expect(component.displayStudentForm).toBeFalse()
  })

  it('should update pagination on page change', () => {
    spyOn(component, 'fetchStudents')

    component.onPageChange({ first: 20, rows: 10 })

    expect(component.pageSize).toBe(10)
    expect(component.fetchStudents).toHaveBeenCalledWith(3)
  })

  it('should sort students by the specified field and order', () => {
    const mockStudents = [
      {
        uid: '2fb0b07e-c1e0-4343-aadc-b151431cad2a',
        firstName: 'Alice',
        lastName: 'Levine',
        age: 22,
        gender: 'Male',
        courses: ['Math', 'Science'],
        actionOptions: []
      },
      {
        uid: '2fb0b07e-c1e0-4343-aadc-b151431cad2b',
        firstName: 'Bob',
        lastName: 'Levine',
        age: 20,
        gender: 'Male',
        courses: ['History', 'Art'],
        actionOptions: []
      },
      {
        uid: '2fb0b07e-c1e0-4343-aadc-b151431cad2c',
        firstName: 'Charlie',
        lastName: 'Levine',
        age: 21,
        gender: 'Male',
        courses: ['English', 'Music'],
        actionOptions: []
      }
    ]

    component.students = mockStudents

    const event = { field: 'firstName', order: 1 }
    component.customSort(event)

    expect(component.students[0].firstName).toBe('Alice')
    expect(component.students[1].firstName).toBe('Bob')
    expect(component.students[2].firstName).toBe('Charlie')

    event.field = 'age'
    event.order = -1
    component.customSort(event)

    expect(component.students[0].age).toBe(22)
    expect(component.students[1].age).toBe(21)
    expect(component.students[2].age).toBe(20)

    event.field = 'courses'
    event.order = 1
    component.customSort(event)

    expect(component.students[0].courses.join(',')).toBe('English,Music')
    expect(component.students[1].courses.join(',')).toBe('History,Art')
    expect(component.students[2].courses.join(',')).toBe('Math,Science')
  })
})
