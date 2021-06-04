require('dotenv').config()

export function signup(identity) {
    cy.visit(`https://${process.env.URL}/setup/account/nb?industry=other-sub-d`)
    cy.get('#manager_first_name').type(identity.first)
    cy.get('#manager_last_name').type(identity.last)
    cy.get('#email').type(identity.email)
    cy.get('#merchant_name').type(`${identity.first} ${identity.last}`)
    cy.get('#manager_contact_number').type('0422673446')
    cy.get('#password').should('be.visible').type('UAT@nb123')
    cy.get('#password_confirmation').should('be.visible').type('UAT@nb123')
    cy.get('[style="width: 304px; height: 78px;"] > div > iframe').click()
    cy.wait(2000)
    cy.get('#btn-continue').click()
    cy.wait(2000)
}

export function login(email, password) {
    cy.visit(`https://${process.env.URL}/auth/login/nb`)
    cy.get('#email').type()
    cy.get('#password').type()
    cy.get('button[type=submit]').first().click()
    cy.wait(2000)
}