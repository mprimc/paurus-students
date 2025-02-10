import { TestBed } from '@angular/core/testing'
import { StudentService } from './student.service'
import { JsonReaderService } from '../network/json-reader.service'
import { of } from 'rxjs'
import { Student } from '../interfaces/student.interfaces'
import { PaginatedResponse } from '../interfaces/pagination.interfaces'

describe('StudentService', () => {
  let studentService: StudentService
  let jsonReaderServiceMock: jasmine.SpyObj<JsonReaderService>
  const mockStudentsData: Student[] = [
    {
      uid: '700b835b-8415-451f-9106-8e417241f5e9',
      firstName: 'Cory',
      lastName: 'Jennings',
      age: 21,
      gender: 'Other',
      grade: 1,
      courses: ['Biology', 'Music', 'Art']
    },
    {
      uid: '2fb0b07e-c1e0-4343-aadc-b151431cad2a',
      firstName: 'Amy',
      lastName: 'Levine',
      age: 22,
      gender: 'Male',
      grade: 11,
      courses: ['History', 'Science', 'Art', 'English']
    },
    {
      uid: '24bdd3b4-cb5e-4444-aa19-8a661a00f9d0',
      firstName: 'Michael',
      lastName: 'Sanders',
      age: 25,
      gender: 'Other',
      grade: 4,
      courses: ['Science', 'English', 'Art']
    },
    {
      uid: '3ad7670d-b9e0-413b-96de-526325f54a00',
      firstName: 'James',
      lastName: 'Martinez',
      age: 21,
      gender: 'Female',
      grade: 6,
      courses: ['Chemistry', 'Art', 'Music', 'Math', 'Biology']
    },
    {
      uid: 'd2169a7d-0d07-42d2-ab8f-a33b692a859a',
      firstName: 'Melanie',
      lastName: 'Gibson',
      age: 22,
      gender: 'Male',
      grade: 10,
      courses: ['History', 'Physical Education', 'Art', 'Math', 'Science']
    },
    {
      uid: 'efee10b3-f83a-46f6-9ec6-1011667dc5bc',
      firstName: 'Elizabeth',
      lastName: 'May',
      age: 20,
      gender: 'Female',
      grade: 8,
      courses: ['Science', 'English', 'Art', 'Music']
    },
    {
      uid: '7fcbb5a3-e362-46a0-822f-ef11afbda291',
      firstName: 'Carla',
      lastName: 'Smith',
      age: 22,
      gender: 'Other',
      grade: 5,
      courses: ['Math', 'Chemistry', 'Music', 'Physical Education']
    },
    {
      uid: 'eb48128a-dde9-49fc-8e57-6925e31b0019',
      firstName: 'Kristin',
      lastName: 'Sanchez',
      age: 19,
      gender: 'Female',
      grade: 5,
      courses: ['History', 'Computer Science', 'Physical Education', 'English', 'Chemistry']
    },
    {
      uid: '2e9d5796-3cf7-4e8c-87c9-f3d07a60a12f',
      firstName: 'David',
      lastName: 'Cunningham',
      age: 18,
      gender: 'Other',
      grade: 10,
      courses: ['Computer Science', 'Music', 'Art', 'History', 'Chemistry']
    },
    {
      uid: '566d1a5d-18a8-4cc0-b4db-864a39dea328',
      firstName: 'Casey',
      lastName: 'Hubbard',
      age: 23,
      gender: 'Female',
      grade: 10,
      courses: ['Biology', 'English', 'Chemistry', 'Physical Education']
    }
  ]

  const initializeTestingModule = () => {
    const mockJsonReaderService = jasmine.createSpyObj('JsonReaderService', ['getStudentsData'])

    TestBed.configureTestingModule({
      providers: [StudentService, { provide: JsonReaderService, useValue: mockJsonReaderService }]
    })

    studentService = TestBed.inject(StudentService)
    jsonReaderServiceMock = TestBed.inject(JsonReaderService) as jasmine.SpyObj<JsonReaderService>

    jsonReaderServiceMock.getStudentsData.and.returnValue(of(mockStudentsData))
  }

  beforeEach(() => {
    initializeTestingModule()
  })

  it('should be created', () => {
    expect(studentService).toBeTruthy()
  })

  describe('.getStudents', () => {
    it('should fetch students and apply pagination correctly', () => {
      const page = 1
      const pageSize = 3

      studentService.getStudents(page, pageSize).subscribe({
        next: (response: PaginatedResponse<Student[]>) => {
          expect(response).toBeTruthy()
          expect(response.result.length).toBe(3)
          expect(response.result[0].firstName).toBe(mockStudentsData[0].firstName)
          expect(response.result[1].firstName).toBe(mockStudentsData[1].firstName)
          expect(response.result[2].firstName).toBe(mockStudentsData[2].firstName)
          expect(response.pagination.totalRecords).toBe(10)
          expect(response.pagination.totalPages).toBe(4)
          expect(response.pagination.nextPage).toBe(2)
          expect(response.pagination.previousPage).toBeNull()
        }
      })

      expect(jsonReaderServiceMock.getStudentsData).toHaveBeenCalledTimes(1)
    })

    it('should handle pagination correctly (next/previous page)', () => {
      const page = 4
      const pageSize = 3
      studentService
        .getStudents(page, pageSize)
        .subscribe((response: PaginatedResponse<Student[]>) => {
          expect(response.result.length).toBe(1)
          expect(response.result[0].firstName).toBe(mockStudentsData[9].firstName)
          expect(response.pagination.totalRecords).toBe(10)
          expect(response.pagination.totalPages).toBe(4)
          expect(response.pagination.nextPage).toBeNull()
          expect(response.pagination.previousPage).toBe(3)
        })

      expect(jsonReaderServiceMock.getStudentsData).toHaveBeenCalledTimes(1)
    })
  })

  describe('.addStudent & .getStudents', () => {
    it('should add a new student', () => {
      const newStudent: Omit<Student, 'uid'> = {
        firstName: 'Miha',
        lastName: 'Surname',
        age: 19,
        gender: 'male',
        grade: 8,
        courses: []
      }
      studentService.addStudent(newStudent)

      studentService.getStudents(1, 1000).subscribe((response: PaginatedResponse<Student[]>) => {
        expect(response.result.some((s) => s.firstName === newStudent.firstName)).toBeTrue()
      })
    })
  })

  describe('.updateStudent & .getStudents', () => {
    it('should update an existing student', () => {
      jsonReaderServiceMock.getStudentsData.and.returnValue(of(mockStudentsData))

      const updatedStudent: Student = { ...mockStudentsData[5], firstName: 'Updated First Name' }
      studentService.updateStudent(updatedStudent)

      studentService.getStudents(1, 1000).subscribe((response: PaginatedResponse<Student[]>) => {
        const updated = response.result.find((el) => el.uid === updatedStudent.uid)
        expect(updated).toBeTruthy()
        expect(updated?.firstName).toBe('Updated First Name')
      })
    })
  })

  describe('.deleteStudent & .getStudents', () => {
    it('should delete a student', () => {
      jsonReaderServiceMock.getStudentsData.and.returnValue(of(mockStudentsData))

      studentService.deleteStudent(mockStudentsData[3].uid)

      studentService.getStudents(1, 1000).subscribe((response: PaginatedResponse<Student[]>) => {
        expect(response.result.some((el) => el.uid === mockStudentsData[3].uid)).toBeFalse()
      })
    })
  })
})
