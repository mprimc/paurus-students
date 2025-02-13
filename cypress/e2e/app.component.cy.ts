describe('Student Management App', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
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
