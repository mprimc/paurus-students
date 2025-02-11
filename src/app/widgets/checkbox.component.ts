import { Component, forwardRef, Input } from '@angular/core'
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { CheckboxModule } from 'primeng/checkbox'

@Component({
  selector: 'checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CheckboxModule],
  template: `
    <div class="checkbox-container">
      <label>{{ label }}</label>
      <div *ngIf="control" class="checkbox-items-holder">
        <div *ngFor="let option of options" class="checkbox-item-holder">
          <p-checkbox
            [inputId]="option"
            [value]="option"
            [formControl]="control"
            (onChange)="updateSelection($event)"
          ></p-checkbox>
          <label [for]="option">{{ option }}</label>
        </div>
      </div>
      <small *ngIf="control?.invalid && control?.touched" class="p-error">
        {{ errorMessage }}
      </small>
    </div>
  `,
  styles: `
    .checkbox-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      gap: 0.5rem;

      .checkbox-items-holder {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 0.5rem;
        .checkbox-item-holder {
          display: flex;
          align-items: center;
          flex-direction: row;
          gap: 0.5rem;
        }
      }
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() inputForm!: FormGroup
  @Input() label!: string
  @Input() formControlName!: string
  @Input() options: string[] = []
  @Input() errorMessage?: string | null

  get control(): FormControl | null {
    return this.inputForm ? (this.inputForm.get(this.formControlName) as FormControl) : null
  }

  value: any = []

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

  updateSelection(event: any): void {
    const selectedValue = event.value
    if (!this.value) {
      this.value = []
    }
    if (event.checked) {
      this.value = [...this.value, selectedValue]
    } else {
      this.value = this.value.filter((item: string) => item !== selectedValue)
    }
    this.onChange(this.value.filter((el: any) => el !== undefined))
  }
}
