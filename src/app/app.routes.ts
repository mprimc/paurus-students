import { Routes } from '@angular/router'
import { StudentListComponent } from './students/list/students-list.component'
// import { StudentFormComponent } from './students/form/student-form.component'

export const routes: Routes = [
  { path: '', redirectTo: 'paurus/students', pathMatch: 'full' },
  { path: 'paurus', redirectTo: 'paurus/students', pathMatch: 'full' },
  { path: 'paurus/students', component: StudentListComponent }
  // { path: 'paurus/students/add', component: StudentFormComponent },
  // { path: 'paurus/students/edit/:id', component: StudentFormComponent }
]
