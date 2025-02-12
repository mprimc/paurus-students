import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { SplitButtonComponent } from './split-button.component'
import { CommonModule } from '@angular/common'
import { SplitButtonModule } from 'primeng/splitbutton'
import { ButtonAction } from '../enums/actions'
import { MenuItem } from 'primeng/api'
import { By } from '@angular/platform-browser'
import { EventEmitter as _EventEmitter } from '@angular/core'

describe('SplitButtonComponent', () => {
  let component: SplitButtonComponent
  let fixture: ComponentFixture<SplitButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SplitButtonModule]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitButtonComponent)
    component = fixture.componentInstance
    component.bondedData = { someData: 'test' }
    fixture.detectChanges()
  })

  it('should handle empty menuItems array gracefully', () => {
    component.menuItems = []
    fixture.detectChanges()

    const splitButton = fixture.debugElement.query(By.css('p-splitbutton'))
    expect(splitButton).toBeTruthy()
  })

  it('should assign menu items correctly when input changes', () => {
    const newMenuItems: MenuItem[] = [
      {
        label: ButtonAction.Edit,
        command: () => {}
      }
    ]

    component.menuItems = newMenuItems
    fixture.detectChanges()

    expect(component.internalMenuItems.length).toBe(1)
    expect(component.internalMenuItems[0].label).toBe(ButtonAction.Edit)
  })

  it('should handle button click with custom severity', () => {
    component.severity = 'danger'
    fixture.detectChanges()

    const splitButton = fixture.debugElement.query(By.css('p-splitbutton'))
    expect(splitButton.componentInstance.severity).toBe('danger')
  })
})
