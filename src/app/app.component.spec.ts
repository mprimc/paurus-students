import { TestBed } from '@angular/core/testing'
import { provideRouter, RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module'
import { Router } from '@angular/router'

describe('AppRoutingModule', () => {
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, RouterModule],
      providers: [provideRouter([])]
    })

    router = TestBed.inject(Router)
  })

  it('should be created', () => {
    expect(router).toBeTruthy()
  })

  it('should have a route for "paurus" that lazy loads the StudentModule', () => {
    const route = router.config.find((r) => r.path === 'paurus')
    expect(route).toBeTruthy()

    const loadChildren = route?.loadChildren
    expect(loadChildren).toBeTruthy()

    if (typeof loadChildren === 'string') {
      expect(loadChildren).toContain('student/student.module')
    } else if (typeof loadChildren === 'function') {
      const loadChildrenFn = loadChildren as unknown as Function
      expect(loadChildrenFn).toBeTruthy()
    }
  })
})
