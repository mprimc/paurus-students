import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { v4 as uuidv4 } from 'uuid'
import { Student } from '../../../interfaces/student.interfaces'

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm()
  }

  ngOnChanges(): void {
    if (this.studentForm) {
      this.studentForm.reset()
      if (this.student) {
        this.studentForm.patchValue(this.student)
      }
    }
  }

  initForm() {
    this.studentForm = this.formBuilder.group({
      uid: [this.student?.uid || uuidv4()],
      firstName: [this.student?.firstName || '', Validators.required],
      lastName: [this.student?.lastName || '', Validators.required],
      age: [this.student?.age || '', [Validators.required, Validators.min(10)]],
      gender: [this.student?.gender || '', Validators.required],
      courses: [this.student?.courses || [], Validators.required]
    })
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.save.emit(this.studentForm.value)
    }
  }

  onCancel() {
    this.close.emit()
  }

  getAgeErrorMessage(): string | null {
    const control = this.studentForm.get('age')
    return control?.hasError('required')
      ? 'Age is required.'
      : control?.hasError('min')
        ? 'Age must be at least 10.'
        : ''
  }

  getNameErrorMessage(): string {
    const control = this.studentForm.get('firstName')
    return control?.hasError('required') ? 'Name is required.' : ''
  }
}
