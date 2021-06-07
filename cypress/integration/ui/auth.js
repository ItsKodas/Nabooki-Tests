export function signup(identity) {
    cy.visit(`https://${Cypress.env('basic_auth')}/setup/account/nb?industry=other-sub-d`)
    cy.get('#manager_first_name').type(identity.first)
    cy.get('#manager_last_name').type(identity.last)
    cy.get('#email').type(identity.email)
    cy.get('#merchant_name').type(`${identity.first} ${identity.last}`)
    cy.get('#manager_contact_number').type('0422673446')
    cy.get('#password').should('be.visible').type('UAT@nb123')
    cy.get('#password_confirmation').should('be.visible').type('UAT@nb123')
    cy.get('#btn-continue').click()
    cy.wait(2000)
}

export function login() {
    cy.visit(`https://${Cypress.env('basic_auth')}/auth/login/nb`)
    cy.get('#email').type(Cypress.env('email'))
    cy.get('#password').type(Cypress.env('password'))
    cy.get('button[type=submit]').first().click()
    cy.wait(2000)
}