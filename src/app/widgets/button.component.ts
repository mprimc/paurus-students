import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="button-container">
      <p-button
        [label]="label"
        [icon]="icon"
        [severity]="severity"
        (click)="onClick()"
        [disabled]="disabled"
        styleClass="button-holder"
      ></p-button>
    </div>
  `,
  styles: `
    .button-container {
      min-width: 100px;
    }
    ::ng-deep .button-holder {
      width: 100%;
    }
  `
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
