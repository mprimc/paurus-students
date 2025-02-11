import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `<p-button
    [label]="label"
    [icon]="icon"
    [severity]="severity"
    (click)="onClick()"
    [disabled]="disabled"
  ></p-button>`
})
export class ButtonComponent {
  @Input() label = ''
  @Input() icon?: string
  @Input() severity:
    | 'success'
    | 'info'
    | 'warn'
    | 'danger'
    | 'help'
    | 'primary'
    | 'secondary'
    | 'contrast' = 'primary'
  @Input() disabled?: boolean = false
  @Input() onClick: () => void = () => {}
}
