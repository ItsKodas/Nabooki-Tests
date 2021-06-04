export function setup() {
    //Setup Payment gateway
    cy.contains('Setup').click({ force: true })
    cy.contains('Online Payments').click({ force: true })
    cy.contains('Payment Gateway').click({ force: true })
    cy.get('#stripe_api_secret_key').type('44DD7CnCUDFgNF9O4heFkfVEw+Fa8jNNO9wmFy6F2mrGiSJ0I3B9t8qam5aoCwwlDaB4qF ')
    cy.get('.fa-caret-down').click()
    //cy.get('.multiselect-all > .checkbox').click()
    cy.get('#stripe_api_publishable_key').type('ye40dkZVkCN4FizyP7XB4cg3fL+1nQr9NAGs1FG0bObIHDYSBoJjvwyoeb8CJMYkFhAfTJgep2O4McsFomrpFLRCgRbIv92uloVjHz6TLmvqAr3aJ/UJdNLpe2k89xe2jkiK3FuWLKDLEShCLTTRevHOwRSX7h+rHmySWWuaXd0ASXAIeHNDORAR2aWWEITFev0q+mpQBUh166iXQMTcwaz41in/qWA6cE8STt+jQCUs6NpUJx8gyR7jC+CZyuFAqRyKXkjfsZLyYzwvOavqTJ8hAbK5af5GF3lD7iEYBv7KkBTm8EuDhJJ2nrCGBXUxNuBS154oCnfuGx15hv9tdQ==')
    cy.contains('Update').click()
    cy.wait(1000)
}