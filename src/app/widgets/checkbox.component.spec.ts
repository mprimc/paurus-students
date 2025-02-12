import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CheckboxComponent } from './checkbox.component'
import { CheckboxModule } from 'primeng/checkbox'
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { By } from '@angular/platform-browser'

describe('CheckboxComponent', () => {
  let component: CheckboxComponent
  let fixture: ComponentFixture<CheckboxComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, CheckboxModule, ReactiveFormsModule]
    }).compileComponents()

    fixture = TestBed.createComponent(CheckboxComponent)
    component = fixture.componentInstance
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should display the label', () => {
    component.label = 'Select Options'
    fixture.detectChanges()
    const labelElement = fixture.debugElement.query(By.css('label'))
    expect(labelElement.nativeElement.textContent.trim()).toBe('Select Options')
  })

  it('should render checkboxes based on options', () => {
    component.inputForm = new FormGroup({ testControl: new FormControl([]) })
    component.formControlName = 'testControl'
    component.options = ['Option 1', 'Option 2', 'Option 3']
    fixture.detectChanges()

    const checkboxes = fixture.debugElement.queryAll(By.css('p-checkbox'))
    expect(checkboxes.length).toBe(3)
  })

  it('should update value when checkbox is checked', () => {
    component.inputForm = new FormGroup({ testControl: new FormControl([]) })
    component.formControlName = 'testControl'
    component.options = ['Option 1', 'Option 2']
    fixture.detectChanges()

    const checkbox = fixture.debugElement.query(By.css('p-checkbox'))
    checkbox.triggerEventHandler('onChange', { value: 'Option 1', checked: true })
    fixture.detectChanges()

    expect(component.value).toContain('Option 1')
  })

  it('should remove value when checkbox is unchecked', () => {
    component.inputForm = new FormGroup({ testControl: new FormControl(['Option 1']) })
    component.formControlName = 'testControl'
    component.options = ['Option 1', 'Option 2']
    fixture.detectChanges()

    const checkbox = fixture.debugElement.query(By.css('p-checkbox'))
    checkbox.triggerEventHandler('onChange', { value: 'Option 1', checked: false })
    fixture.detectChanges()

    expect(component.value).not.toContain('Option 1')
  })

  it('should display error message when control is invalid and touched', () => {
    component.inputForm = new FormGroup({
      testControl: new FormControl('', { nonNullable: true })
    })

    component.formControlName = 'testControl'
    fixture.detectChanges()

    const control = component.control!
    control.markAsTouched()
    control.setErrors({ required: true })
    fixture.detectChanges()

    const errorMessageElement = fixture.debugElement.query(By.css('.error-message-text'))
    expect(errorMessageElement).toBeTruthy()
  })
})
