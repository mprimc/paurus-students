import { Component, forwardRef, Input } from '@angular/core'
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'input-text',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="input-text-container">
      <label for="inputText">{{ label }}</label>
      <input id="inputText" pInputText [formControlName]="formControlName" />
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
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() inputForm!: FormGroup
  @Input() label!: string
  @Input() formControlName!: string
  @Input() errorMessage?: string | null

  value: string = ''

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
