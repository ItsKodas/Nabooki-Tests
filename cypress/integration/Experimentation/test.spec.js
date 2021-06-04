describe('Nabookie', () => {
    it('Test A1', () => {
        cy.visit('https://uat5.nabooki.com/auth/login/nb')

        cy.get('#email').type('admin@admin.com')
        cy.get('#password').type('UAT2AdminSuite')
        cy.contains('Login').click()

        cy.visit('https://uat5.nabooki.com/admin/clients')

        cy.get('[aria-label="to page 6"]').click()
        cy.get('[data-index="53"]')
            .within(() => {
                cy.get('[title="Login as client"]').click()
            })

        cy.get('[data-index="0"]')
            .within(() => {
                cy.get('[data-action="loginAsMerchant"]').click()
            })

        cy.contains('Setup').click()
        cy.contains('Services').click()
    })
})