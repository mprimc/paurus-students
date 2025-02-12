import { Component, forwardRef, Input } from '@angular/core'
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SelectModule } from 'primeng/select'
import { SelectItem } from '../interfaces/select.interfaces'

@Component({
  selector: 'dropdown-select',
  imports: [ReactiveFormsModule, CommonModule, SelectModule], // Import DropdownModule
  template: `
    <div class="select-container">
      <div class="select-data-holder">
        <label for="inputSelect">{{ label }}</label>
        <p-select
          *ngIf="control"
          id="inputSelect"
          [formControl]="control"
          [options]="options"
          optionLabel="label"
          optionValue="value"
          placeholder="Select {{ label }}"
          size="small"
        >
        </p-select>
      </div>
      <small *ngIf="control?.invalid && control?.touched" class="error-message-text">
        {{ errorMessage }}
      </small>
    </div>
  `,
  styles: `
    .select-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 0.4rem;
      & .select-data-holder {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        gap: 0.5rem;

        .p-select {
          min-width: 9rem;
        }
      }
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() inputForm!: FormGroup
  @Input() label!: string
  @Input() formControlName!: string
  @Input() options: SelectItem[] = []
  @Input() errorMessage?: string | null

  get control(): FormControl | null {
    return this.inputForm ? (this.inputForm.get(this.formControlName) as FormControl) : null
  }

  value: any = null

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
