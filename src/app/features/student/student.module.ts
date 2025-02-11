import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StudentRoutingModule } from './student-routing.module'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { StudentListComponent } from './list/students-list.component'
import { StudentFormComponent } from './form/student-form.component'
import { SplitButton } from 'primeng/splitbutton'
import { RouterOutlet } from '@angular/router'
import { InputNumberComponent } from '../../widgets/input-number.component'
import { InputTextComponent } from '../../widgets/input-text.component'
import { ButtonComponent } from '../../widgets/button.component'
import { SplitButtonComponent } from '../../widgets/split.button.component'

@NgModule({
  declarations: [StudentListComponent, StudentFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    StudentRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    RouterOutlet,
    SplitButton,
    ButtonComponent,
    InputNumberComponent,
    InputTextComponent,
    SplitButtonComponent
  ]
})
export class StudentModule {}
