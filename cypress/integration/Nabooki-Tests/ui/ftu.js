export default function run() {
    //FTU
    cy.get('#address_1').should('be.visible').type(address_1)
    cy.get('#suburb').type(suburb)
    cy.get('#state').select('QLD')
    cy.get('#postcode').type(postcode)
    cy.get('select[name="timezone"]').select('(UTC+10:00) Brisbane')
    cy.get('#btn-custom-link').click()
    cy.get('#save-btn').click()
    cy.get('#name').type('Test Single Service')
    cy.get('#duration_hours').select('1 hrs')
    cy.get('#price').type('100')
    cy.get('#btn-services-general').click()
    cy.wait(1000)
    cy.get('#setup-continue-finish').click()
    cy.wait(2000)
}