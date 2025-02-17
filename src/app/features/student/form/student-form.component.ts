import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Student } from '../../../interfaces/student.interfaces'
import { v4 as uuidv4 } from 'uuid'
import { SelectItem } from '../../../interfaces/select.interfaces'

@Component({
  standalone: false,
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  @Input() student: Student | null = null
  @Input() visible = false
  @Output() save = new EventEmitter<Student>()
  @Output() close = new EventEmitter<void>()

  studentForm!: FormGroup
  genderOptions: SelectItem[]
  availableCourses: string[]

  constructor(private formBuilder: FormBuilder) {
    this.genderOptions = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Other', value: 'Other' }
    ]
    this.availableCourses = [
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
  }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnChanges(): void {
    if (this.studentForm) {
      this.studentForm.reset()
      if (this.student) {
        this.studentForm.patchValue(this.student)
        this.studentForm.get('firstName')?.disable()
        this.studentForm.get('lastName')?.disable()
        this.studentForm.get('age')?.disable()
        this.studentForm.get('gender')?.disable()
      } else {
        this.studentForm.get('firstName')?.enable()
        this.studentForm.get('lastName')?.enable()
        this.studentForm.get('age')?.enable()
        this.studentForm.get('gender')?.enable()
      }
    }
  }

  initForm() {
    this.studentForm = this.formBuilder.group({
      uid: [this.student?.uid || uuidv4()],
      firstName: [this.student?.firstName || '', Validators.required],
      lastName: [this.student?.lastName || '', Validators.required],
      age: [this.student?.age || '', [Validators.required, Validators.min(18)]],
      gender: [this.student?.gender || '', Validators.required],
      courses: [this.student?.courses || [], Validators.required]
    })
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const student = this.studentForm.getRawValue()
      this.save.emit(student)
    }
  }

  onCancel() {
    this.close.emit()
  }

  validateAgeField(): string | null {
    const control = this.studentForm.get('age')
    return control?.hasError('required')
      ? '* Age is required.'
      : control?.hasError('min')
        ? '* Age must be at least 18.'
        : ''
  }

  validateStringField(formName: string): string {
    const control = this.studentForm.get(formName)
    return control?.hasError('required') ? '* Field is required.' : ''
  }
}
