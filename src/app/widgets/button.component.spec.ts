import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ButtonComponent } from './button.component'
import { ButtonModule } from 'primeng/button'
import { By } from '@angular/platform-browser'
import { waitForAsync } from '@angular/core/testing'

describe('ButtonComponent', () => {
  let component: ButtonComponent
  let fixture: ComponentFixture<ButtonComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent, ButtonModule]
    }).compileComponents()

    fixture = TestBed.createComponent(ButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterAll(async () => {
    await fixture.whenStable()
    const buttonElement = fixture.debugElement.query(By.css('p-button')).nativeElement
    expect(buttonElement).toBeTruthy()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should display the label passed via @Input()', () => {
    component.label = 'Submit'
    fixture.detectChanges()
    const buttonElement = fixture.debugElement.query(By.css('.button-holder'))
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Submit')
  })

  it('should bind icon property to the button', waitForAsync(() => {
    component.icon = 'pi pi-check'
    fixture.detectChanges()

    fixture.whenStable().then(() => {
      const buttonElement = fixture.debugElement.query(By.css('button'))
      expect(buttonElement).toBeTruthy()

      const iconElement = buttonElement.nativeElement.querySelector('span.p-button-icon')

      expect(iconElement).toBeTruthy()
      expect(iconElement.classList).toContain('pi')
      expect(iconElement.classList).toContain('pi-check')
    })
  }))

  it('should apply the correct severity class', () => {
    component.severity = 'success'
    fixture.detectChanges()
    const buttonElement = fixture.debugElement.query(By.css('.button-holder'))
    expect(buttonElement.nativeElement.classList).toContain('p-button-success')
  })

  it('should disable the button when disabled input is true', () => {
    component.disabled = true
    fixture.detectChanges()

    const buttonElement = fixture.debugElement.query(By.css('p-button button')).nativeElement
    expect(buttonElement.disabled).toBeTrue()
  })

  it('should enable the button when disabled input is false', () => {
    component.disabled = false
    fixture.detectChanges()

    const buttonElement = fixture.debugElement.query(By.css('p-button button')).nativeElement
    expect(buttonElement.disabled).toBeFalse()
  })

  it('should trigger onClick method when button is clicked', () => {
    spyOn(component, 'onClick')
    const buttonElement = fixture.debugElement.query(By.css('p-button'))
    buttonElement.triggerEventHandler('click', null)
    expect(component.onClick).toHaveBeenCalled()
  })
})
