import { TestBed } from '@angular/core/testing'
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing'
import { JsonReaderService } from './json-reader.service'
import { Student } from '../interfaces/student.interfaces'
import { provideHttpClient } from '@angular/common/http'

describe('JsonReaderService', () => {
  let service: JsonReaderService
  let httpMock: HttpTestingController
  const mockStudentsData: Student[] = [
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

  it('should fetch students data', () => {
    service.getStudentsData().subscribe({
      next: (students: Student[]) => {
        expect(students.length).toBe(2)
        expect(students).toEqual(mockStudentsData)
      }
    })

    const req = httpMock.expectOne('assets/students.json')
    expect(req.request.method).toBe('GET')
    req.flush(mockStudentsData)
  })

  it('should handle error when fetching students data', () => {
    const errorMessage = 'Failed to fetch data'

    service.getStudentsData().subscribe({
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
