import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Paurus students project'

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route])
  }
}
