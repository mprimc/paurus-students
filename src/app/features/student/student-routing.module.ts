import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { StudentListComponent } from './list/students-list.component'

const routes: Routes = [{ path: 'students', component: StudentListComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
