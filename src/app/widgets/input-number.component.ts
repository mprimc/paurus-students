import { Component, forwardRef, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'input-number',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="input-number-container">
      <label for="inputNumber">{{ label }}</label>
      <input id="inputNumber" pInputText type="number" [formControlName]="formControlName" />
      <small
        *ngIf="inputForm?.get(formControlName)?.invalid && inputForm?.get(formControlName)?.touched"
        class="p-error"
      >
        {{ errorMessage }}
      </small>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    }
  ]
})
export class InputNumberComponent {
  @Input() inputForm!: FormGroup
  @Input() label!: string
  @Input() formControlName!: string
  @Input() errorMessage?: string | null
  value: number | string = ''

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  onChange(_: any): void {}
  onTouched(): void {}
}
