describe('Student Management App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should match the snapshot', () => {
    cy.get('h1').contains('Student Paurus Management App')
  })

  it('should match the student list button snapshot', () => {
    cy.get('.p-button-text').contains('Navigate to Student List')
  })

  // it('should match the snapshot', () => {
  //   // cy.get('.app-component-container').compareSnapshot('app-component')
  // })
})
