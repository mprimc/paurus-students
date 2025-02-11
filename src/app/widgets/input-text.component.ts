import { Component, forwardRef, Input } from '@angular/core'
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'input-text',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="input-text-container">
      <label for="inputText">{{ label }}</label>
      <input *ngIf="control" id="inputText" pInputText [formControl]="control" />
      <small *ngIf="control?.invalid && control?.touched" class="p-error">
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

  get control(): FormControl | null {
    return this.inputForm ? (this.inputForm.get(this.formControlName) as FormControl) : null
  }

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

  setDisabledState(isDisabled: boolean): void {
    if (this.control?.disabled !== isDisabled) {
      if (isDisabled) {
        this.control?.disable()
      } else {
        this.control?.enable()
      }
    }
  }
}
