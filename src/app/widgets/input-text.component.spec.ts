import { InputTextModule } from 'primeng/inputtext'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InputTextComponent } from './input-text.component'
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

describe('InputTextComponent', () => {
  let component: InputTextComponent
  let fixture: ComponentFixture<InputTextComponent>
  let inputEl: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputTextModule, InputTextComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent)
    component = fixture.componentInstance
    component.inputForm = new FormGroup({
      testField: new FormControl('')
    })
    component.formControlName = 'testField'
    component.label = 'Test Label'
    component.errorMessage = 'This field is required'
    fixture.detectChanges()

    inputEl = fixture.debugElement.query(By.css('input'))
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should bind label correctly', () => {
    const labelEl = fixture.debugElement.query(By.css('label'))
    expect(labelEl.nativeElement.textContent).toContain('Test Label')
  })

  it('should update the value when input changes', () => {
    inputEl.nativeElement.value = 'New Value'
    inputEl.nativeElement.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(component.control?.value).toBe('New Value')
  })

  it('should display error message when control is invalid and touched', () => {
    component.control?.setErrors({ required: true })
    component.control?.markAsTouched()
    fixture.detectChanges()

    const errorEl = fixture.debugElement.query(By.css('small'))
    expect(errorEl.nativeElement.textContent).toContain('This field is required')
  })

  it('should disable input when setDisabledState is called with true', () => {
    component.setDisabledState(true)
    fixture.detectChanges()

    expect(inputEl.nativeElement.disabled).toBeTrue()
  })

  it('should enable input when setDisabledState is called with false', () => {
    component.setDisabledState(false)
    fixture.detectChanges()

    expect(inputEl.nativeElement.disabled).toBeFalse()
  })
})
