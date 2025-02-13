import { defineConfig } from 'cypress'
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    viewportWidth: parseInt(process.env['CYPRESS_VIEWPORT_WIDTH'] || '1280'),
    viewportHeight: parseInt(process.env['CYPRESS_VIEWPORT_HEIGHT'] || '720'),
    specPattern: 'cypress/e2e/**/*.cy.ts',
    video: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0
    },
    defaultCommandTimeout: 10000,
    setupNodeEvents(on) {
      addMatchImageSnapshotPlugin(on)
    }
  }
})
