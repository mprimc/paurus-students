import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StudentFormComponent } from './student-form.component'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'
import { Student } from '../../../interfaces/student.interfaces'
import { SelectItem } from '../../../interfaces/select.interfaces'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import { RouterModule } from '@angular/router'
import { DialogModule } from 'primeng/dialog'
import { SplitButtonModule } from 'primeng/splitbutton'
import { SplitButtonComponent } from '../../../widgets/split-button.component'
import { SelectModule } from 'primeng/select'
import { CheckboxModule } from 'primeng/checkbox'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { ButtonComponent } from '../../../widgets/button.component'
import { InputNumberComponent } from '../../../widgets/input-number.component'
import { InputTextComponent } from '../../../widgets/input-text.component'
import { CheckboxComponent } from '../../../widgets/checkbox.component'
import { SelectComponent } from '../../../widgets/select.component'

describe('StudentFormComponent', () => {
  let component: StudentFormComponent
  let fixture: ComponentFixture<StudentFormComponent>
  let formBuilder: FormBuilder
  const student: Student = {
    uid: '700b835b-8415-451f-9106-8e417241f5e9',
    firstName: 'Cory',
    lastName: 'Jennings',
    age: 21,
    gender: 'Other',
    courses: ['Biology', 'Music', 'Art']
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      declarations: [StudentFormComponent],
      providers: [FormBuilder]
    }).compileComponents()

    fixture = TestBed.createComponent(StudentFormComponent)
    component = fixture.componentInstance
    formBuilder = TestBed.inject(FormBuilder)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form controls with provided student data', () => {
    component.student = student
    component.ngOnInit()
    component.ngOnChanges()
    fixture.detectChanges()

    expect(component.studentForm.get('firstName')?.value).toBe(student.firstName)
    expect(component.studentForm.get('lastName')?.value).toBe(student.lastName)
    expect(component.studentForm.get('age')?.value).toBe(student.age)
    expect(component.studentForm.get('gender')?.value).toBe(student.gender)
    expect(component.studentForm.get('courses')?.value).toEqual(student.courses)
  })

  it('should disable fields for existing student', () => {
    component.student = student
    fixture.detectChanges()
    component.ngOnChanges()

    expect(component.studentForm.get('firstName')?.disabled).toBe(true)
    expect(component.studentForm.get('lastName')?.disabled).toBe(true)
    expect(component.studentForm.get('age')?.disabled).toBe(true)
    expect(component.studentForm.get('gender')?.disabled).toBe(true)
  })

  it('should enable fields for new student', () => {
    component.student = null
    component.ngOnInit()
    component.ngOnChanges()
    fixture.detectChanges()

    expect(component.studentForm.get('firstName')?.enabled).toBeTrue()
    expect(component.studentForm.get('lastName')?.enabled).toBeTrue()
    expect(component.studentForm.get('age')?.enabled).toBeTrue()
    expect(component.studentForm.get('gender')?.enabled).toBeTrue()
  })

  it('should emit save event with valid student data on submit', () => {
    component.student = student
    component.ngOnInit()
    component.ngOnChanges()
    fixture.detectChanges()

    component.studentForm.setValue({
      uid: student.uid,
      firstName: student.firstName,
      lastName: student.lastName,
      age: student.age,
      gender: student.gender,
      courses: student.courses
    })

    spyOn(component.save, 'emit')
    component.onSubmit()
    expect(component.save.emit).toHaveBeenCalledWith(student)
  })

  it('should not emit save event if form is invalid on submit', () => {
    component.student = student
    component.ngOnInit()
    component.ngOnChanges()
    fixture.detectChanges()

    component.studentForm.get('age')?.setValue('')

    spyOn(component.save, 'emit')
    component.onSubmit()
    expect(component.save.emit).not.toHaveBeenCalled()
  })

  it('should emit close event on cancel', () => {
    spyOn(component.close, 'emit')
    component.onCancel()
    expect(component.close.emit).toHaveBeenCalled()
  })

  it('should validate age field as required', () => {
    component.student = student
    component.ngOnInit()
    component.ngOnChanges()
    fixture.detectChanges()

    const ageControl = component.studentForm.get('age')
    ageControl?.setValue('')
    expect(component.validateAgeField()).toBe('* Age is required.')

    ageControl?.setValue(17)
    expect(component.validateAgeField()).toBe('* Age must be at least 18.')

    ageControl?.setValue(20)
    expect(component.validateAgeField()).toBe('')
  })

  it('should validate string fields as required', () => {
    component.student = student
    component.ngOnInit()
    component.ngOnChanges()
    fixture.detectChanges()

    const firstNameControl = component.studentForm.get('firstName')
    firstNameControl?.setValue('')
    expect(component.validateStringField('firstName')).toBe('* Field is required.')

    const lastNameControl = component.studentForm.get('lastName')
    lastNameControl?.setValue('')
    expect(component.validateStringField('lastName')).toBe('* Field is required.')
  })

  it('should have gender options', () => {
    const expectedGenderOptions: SelectItem[] = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Other', value: 'Other' }
    ]
    expect(component.genderOptions).toEqual(expectedGenderOptions)
  })

  it('should have available courses', () => {
    const expectedCourses = [
      'Biology',
      'Music',
      'Art',
      'History',
      'Science',
      'English',
      'Chemistry',
      'Math',
      'Physical Education',
      'Computer Science'
    ]
    expect(component.availableCourses).toEqual(expectedCourses)
  })
})
