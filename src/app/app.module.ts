import { NgModule } from '@angular/core'
import { provideZoneChangeDetection } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { RouterOutlet } from '@angular/router'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config'
import Aura from '@primeng/themes/aura'
import { ButtonModule } from 'primeng/button'
import { ButtonComponent } from './widgets/button.component'

@NgModule({
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'primeng',
          darkModeSelector: 'system',
          cssLayer: {
            name: 'primeng',
            order: 'app-styles, primeng, another-css-library'
          }
        }
      }
    })
  ],
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterOutlet, ButtonModule, ButtonComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
