import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InputNumberComponent } from './input-number.component'
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'

describe('InputNumberComponent', () => {
  let component: InputNumberComponent
  let fixture: ComponentFixture<InputNumberComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, InputTextModule, InputNumberComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumberComponent)
    component = fixture.componentInstance
    component.inputForm = new FormGroup({
      testControl: new FormControl('')
    })
    component.formControlName = 'testControl'
    component.label = 'Test Label'
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should render the label', () => {
    const labelElement = fixture.debugElement.query(By.css('label'))
    expect(labelElement.nativeElement.textContent).toContain('Test Label')
  })

  it('should bind the form control correctly', () => {
    const inputElement = fixture.debugElement.query(By.css('input'))
    expect(inputElement).toBeTruthy()
  })

  it('should update the value when input changes', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement
    inputElement.value = '123'
    inputElement.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    expect(component.control?.value).toBe(123)
  })

  it('should display error message when control is invalid and touched', () => {
    component.errorMessage = 'Error message'
    component.control?.setErrors({ required: true })
    component.control?.markAsTouched()
    fixture.detectChanges()
    const errorElement = fixture.debugElement.query(By.css('small'))
    expect(errorElement.nativeElement.textContent).toContain('Error message')
  })
})
