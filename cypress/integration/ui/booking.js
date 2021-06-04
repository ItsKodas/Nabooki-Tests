import 'cypress-iframe'

export function run(identity) {
    // Add first test booking steps will go here
    cy.frameLoaded('#widget-inline-embed')
    cy.wait(1000)
    cy.iframe('#widget-inline-embed').xpath('//li/ul/li').first().click()
    cy.iframe('#widget-inline-embed').find('#book-now-btn').click()
    cy.frameLoaded('#widget-inline-embed')
    cy.wait(4000)
    cy.iframe('#widget-inline-embed').find('#first_name').type(identity.c_name)
    cy.iframe('#widget-inline-embed').find('#last_name').type(identity.c_surname)
    cy.iframe('#widget-inline-embed').find('#email').type(identity.c_email)
    cy.iframe('#widget-inline-embed').find('#mobile').type('0412345678')
    cy.iframe('#widget-inline-embed').find('button[type=submit]').click()
    cy.wait(2000)

    cy.get('#setup-continue-finish').click()
    cy.wait(2000)
}