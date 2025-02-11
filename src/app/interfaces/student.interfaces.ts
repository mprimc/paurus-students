import { MenuItem } from 'primeng/api'

export interface Student {
  uid: string
  firstName: string
  lastName: string
  age: number
  gender: string
  courses: string[]
}

export interface StudentMenuItem extends Student {
  actionOptions: MenuItem[]
}
