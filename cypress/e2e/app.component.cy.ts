describe('Student Management App', () => {
  beforeEach(() => {
    cy.viewport(
      Cypress.env('CYPRESS_VIEWPORT_WIDTH') || 1280,
      Cypress.env('CYPRESS_VIEWPORT_HEIGHT') || 720
    )
    cy.visit('/')
  })

  it('should match the snapshot', () => {
    cy.get('h1').contains('Student Paurus Management App')
  })

  it('should match the student list button snapshot', () => {
    cy.get('.p-button-text').contains('Navigate to Student List')
  })

  it('should match the snapshot', () => {
    cy.get('.app-component-container').matchImageSnapshot('AppComponent')
  })
})
