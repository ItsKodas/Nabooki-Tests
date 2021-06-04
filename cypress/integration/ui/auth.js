
export function signup() {
    cy.visit('https://services.test/setup/account/nb?industry=other-sub-d')
    cy.get('#manager_first_name').type(person.first)
    cy.get('#manager_last_name').type(person.last)
    cy.get('#email').type(person.email)
    cy.get('#merchant_name').type(`${person.first} ${person.last}`)
    cy.get('#manager_contact_number').type('0422673446')
    cy.get('#password').should('be.visible').type('UAT@nb123')
    cy.get('#password_confirmation').should('be.visible').type('UAT@nb123')    
    cy.get('#btn-continue').click()
    cy.wait(2000)
}

export function login(email, password) {
    cy.visit('https://groupon:groupontesting123@hotfix.nabooki.com/auth/login/nb')
    cy.get('#email').type()
    cy.get('#password').type()
    cy.get('button[type=submit]').first().click()
    cy.wait(2000)
}