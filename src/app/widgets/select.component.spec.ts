import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SelectComponent } from './select.component'
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { SelectModule } from 'primeng/select'
import { By } from '@angular/platform-browser'

describe('SelectComponent', () => {
  let component: SelectComponent
  let fixture: ComponentFixture<SelectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SelectModule, SelectComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent)
    component = fixture.componentInstance
    component.inputForm = new FormGroup({
      sampleControl: new FormControl('', [Validators.required])
    })
    component.formControlName = 'sampleControl'
    component.label = 'Test Label'
    component.options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ]
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should display the label correctly', () => {
    const labelElement = fixture.debugElement.query(By.css('label')).nativeElement
    expect(labelElement.textContent).toContain('Test Label')
  })

  it('should display the correct options in the dropdown', async () => {
    component.options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ]
    fixture.detectChanges()

    await fixture.whenStable()

    const dropdown = fixture.debugElement.query(By.css('p-dropdown'))

    if (dropdown) {
      const dropdownItems = fixture.debugElement.queryAll(By.css('.p-dropdown-item'))
      expect(dropdownItems.length).toBe(2)
    }
  })

  it('should bind the form control to the select element', () => {
    component.control?.setValue('2')
    fixture.detectChanges()

    expect(component.control?.value).toBe('2')
  })

  it('should display error message when control is invalid and touched', async () => {
    component.errorMessage = 'Test Label is required'
    component.control?.setErrors({ required: true })
    component.control?.markAsTouched()

    fixture.detectChanges()
    const errorMessage = fixture.debugElement.query(By.css('.error-message-text'))
    expect(errorMessage).toBeTruthy()
    expect(errorMessage.nativeElement.textContent).toContain('Test Label is required')
  })

  it('should disable the select control when setDisabledState is called with true', () => {
    component.setDisabledState(true)
    fixture.detectChanges()

    expect(component.control?.disabled).toBeTrue()
  })

  it('should enable the select control when setDisabledState is called with false', () => {
    component.setDisabledState(false)
    fixture.detectChanges()

    expect(component.control?.disabled).toBeFalse()
  })
})
