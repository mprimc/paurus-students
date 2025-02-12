import { Component, forwardRef, Input } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'input-number',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="input-number-container">
      <div class="input-number-data-holder">
        <label for="inputNumber">{{ label }}</label>
        <input *ngIf="control" pInputText type="number" [formControl]="control" />
      </div>
      <small *ngIf="control?.invalid && control?.touched" class="error-message-text">
        {{ errorMessage }}
      </small>
    </div>
  `,
  styles: `
    .input-number-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 0.4rem;
      & .input-number-data-holder {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        gap: 0.5rem;
      }
    }
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

  get control(): FormControl | null {
    return this.inputForm ? (this.inputForm.get(this.formControlName) as FormControl) : null
  }

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
