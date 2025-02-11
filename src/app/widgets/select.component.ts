import { Component, forwardRef, Input } from '@angular/core'
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown' // Import PrimeNG DropdownModule
import { SelectModule } from 'primeng/select'
import { SelectItem } from '../interfaces/select.interfaces'

@Component({
  selector: 'dropdown-select',
  imports: [ReactiveFormsModule, CommonModule, SelectModule], // Import DropdownModule
  template: `
    <div class="select-container">
      <label for="inputSelect">{{ label }}</label>
      <p-select
        *ngIf="control"
        id="inputSelect"
        [formControl]="control"
        [options]="options"
        optionLabel="label"
        optionValue="value"
        placeholder="Select {{ label }}"
      >
      </p-select>
      <small *ngIf="control?.invalid && control?.touched" class="p-error">
        {{ errorMessage }}
      </small>
    </div>
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
}
