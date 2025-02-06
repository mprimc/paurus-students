import { TestBed } from '@angular/core/testing'
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing'
import { JsonReaderService } from './json-reader.service'
import { Student } from '../interfaces/student.interfaces'
import { provideHttpClient } from '@angular/common/http'
import { PaginatedResponse } from '../interfaces/pagination.interfaces'

describe('JsonReaderService', () => {
  let service: JsonReaderService
  let httpMock: HttpTestingController
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonReaderService, provideHttpClient(), provideHttpClientTesting()]
    })

    service = TestBed.inject(JsonReaderService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get filtered and paginated students data', () => {
    const page = 1
    const pageSize = 3
    const uidFilter = [
      '700b835b-8415-451f-9106-8e417241f5e9',
      '24bdd3b4-cb5e-4444-aa19-8a661a00f9d0'
    ] // Cory and Michael

    service.getStudentsData(page, pageSize, uidFilter).subscribe({
      next: (response: PaginatedResponse<Student[]>) => {
        expect(response).toBeTruthy()
        expect(response.result.length).toBe(3)
        expect(response.result[0].firstName).toBe(mockStudentsData[1].firstName)
        expect(response.result[1].firstName).toBe(mockStudentsData[3].firstName)
        expect(response.result[2].firstName).toBe(mockStudentsData[4].firstName)
        expect(response.pagination.totalRecords).toBe(8)
        expect(response.pagination.totalPages).toBe(3)
        expect(response.pagination.nextPage).toBe(2)
        expect(response.pagination.previousPage).toBeNull()
      }
    })

    const req = httpMock.expectOne('assets/students.json')
    expect(req.request.method).toBe('GET')
    req.flush(mockStudentsData)
  })

  it('should handle pagination correctly (next/previous page)', () => {
    const page = 3
    const pageSize = 3
    const uidFilter = [
      '700b835b-8415-451f-9106-8e417241f5e9',
      '24bdd3b4-cb5e-4444-aa19-8a661a00f9d0'
    ] // Cory and Michael

    service
      .getStudentsData(page, pageSize, uidFilter)
      .subscribe((response: PaginatedResponse<Student[]>) => {
        expect(response.result.length).toBe(2)
        expect(response.result[0].firstName).toBe(mockStudentsData[8].firstName)
        expect(response.result[1].firstName).toBe(mockStudentsData[9].firstName)
        expect(response.pagination.totalRecords).toBe(8)
        expect(response.pagination.totalPages).toBe(3)
        expect(response.pagination.nextPage).toBeNull()
        expect(response.pagination.previousPage).toBe(2)
      })

    const req = httpMock.expectOne('assets/students.json')
    expect(req.request.method).toBe('GET')
    req.flush(mockStudentsData)
  })

  it('should handle error when fetching students data', () => {
    const errorMessage = 'Failed to fetch data'

    service.getStudentsData(1, 1, []).subscribe({
      next: () => fail('Expected an error, but got data'),
      error: (error) => {
        expect(error.status).toBe(404)
        expect(error.error).toBe(errorMessage)
      }
    })

    // Mock HTTP request with error
    const req = httpMock.expectOne('assets/students.json')
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' })
  })
})
