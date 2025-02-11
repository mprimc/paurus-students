import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SplitButtonModule } from 'primeng/splitbutton'
import { MenuItem } from 'primeng/api'
import { ButtonAction } from '../enums/actions'

@Component({
  selector: 'split-button',
  imports: [CommonModule, SplitButtonModule],
  template: `
    <p-splitbutton
      [label]="label"
      [dropdownIcon]="dropdownIcon"
      [model]="internalMenuItems"
      [severity]="severity"
      [styleClass]="styleClass"
    >
    </p-splitbutton>
  `,
  styles: `
    ::ng-deep .icon-only-button .p-splitbutton-button.p-button {
      display: none;
    }

    ::ng-deep .icon-only-button .p-splitbutton-dropdown.p-button {
      border-radius: var(--primeng-button-border-radius);
    }
  `
})
export class SplitButtonComponent<T = any> {
  constructor(private cdRef: ChangeDetectorRef) {}

  @Input() styleClass: string = 'split-button-container'
  @Input() label?: string = 'Options'
  @Input() dropdownIcon: string = 'pi pi-ellipsis-v'
  @Input() severity:
    | 'success'
    | 'info'
    | 'warn'
    | 'danger'
    | 'help'
    | 'primary'
    | 'secondary'
    | 'contrast' = 'primary'
  @Output() optionSelected = new EventEmitter<{ action: ButtonAction; bondedData: T }>()

  @Input() bondedData!: T
  internalMenuItems: MenuItem[] = []

  @Input() set menuItems(items: MenuItem[]) {
    if (items && items.length > 0) {
      this.internalMenuItems = items.map((item) => ({
        ...item,
        command: () => {
          this.optionSelected.emit({
            action: item.label as ButtonAction,
            bondedData: this.bondedData
          })
          this.cdRef.detectChanges()
        }
      }))
    }
  }
}
