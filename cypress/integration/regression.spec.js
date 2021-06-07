require('cypress-iframe')
require('cypress-xpath')

import * as utils from './app/utils'

var identity = new utils.Identity()

import * as auth from './ui/auth'
import * as booking from './ui/booking'
import * as ftu from './ui/ftu'
import * as payment from './ui/payment'
import * as service from './ui/service'



describe('E2E', () => {

  it('Merchant - Non Restaurant', () => {

    //auth.signup(identity)
    auth.login()
    //payment.setupGateway()
    //booking.add(identity)

    //Create a booking for a sub-service
    cy.visit(`https://${Cypress.env('basic_auth')}/merchant/settings/integration/website`)
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[8]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = `https://${Cypress.env('basic_auth').split('@')[0]}@${widgetIframe.substring(419, 490)}`
        console.log(widgetIframe);
        console.log(widgetURL);
        cy.visit(widgetURL)
      })
    cy.wait(1500)
    cy.get('#multiselect-number_of_people-required-container').click()
    cy.wait(500)
    cy.xpath('//*[@id="multiselect-number_of_people-required-container"]/ul/li[3]/a/label').click()
    cy.wait(500)
    cy.xpath('//*[@id="basket"]/h3/strong').should('have.text', '2 people')
    cy.get('#book-now-btn').click()
    cy.wait(2000)
    cy.get('#first_name').type(identity.c_name)
    cy.get('#last_name').type(identity.c_surname)
    cy.get('#email').type(identity.c_email)
    cy.get('#mobile').type('0412345678')
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.get('.text-capitalize').should(($bookingConfirmation) => {
      expect($bookingConfirmation).to.contain('Booking Confirmed')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[2]/ul/li[2]').should(($bookingTwopplbooked) => {
      expect($bookingTwopplbooked).to.contain('Number of people: 2')
    })


    //Create a booking for Price category service
    cy.visit(`https://${Cypress.env('basic_auth')}/merchant/settings/integration/website`)
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[9]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = `https://${Cypress.env('basic_auth').split('@')[0]}@${widgetIframe.substring(419, 490)}`
        console.log(widgetIframe);
        console.log(widgetURL);
        cy.visit(widgetURL)
      })
    cy.wait(1500)
    cy.get('#pricing_category_text').click()
    cy.get('.number_of_people-pricing_category').eq(3).select('1', { force: true })
    cy.wait(1000)
    cy.contains('UPDATE').click({ force: true })
    cy.wait(2000)
    cy.xpath('//*[@id="basket"]/h3/strong').should('have.text', '2 people')
    cy.get('#book-now-btn').click()
    cy.wait(3000)
    cy.get('#first_name').type(identity.c_name)
    cy.get('#last_name').type(identity.c_surname)
    cy.get('#email').type(identity.c_email)
    cy.get('#mobile').type('0412345678')
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.get('.text-capitalize').should(($bookingConfirmation) => {
      expect($bookingConfirmation).to.contain('Booking Confirmed')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[2]/ul/li[2]').should(($bookingTwopplbooked) => {
      expect($bookingTwopplbooked).to.contain('Number of people: 2')
    })


    //Create unrestrictted partially prepaid booking
    cy.visit(`https://${Cypress.env('basic_auth')}/merchant/settings/integration/website`)
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[10]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = `https://${Cypress.env('basic_auth').split('@')[0]}@${widgetIframe.substring(419, 490)}`
        console.log(widgetIframe);
        console.log(widgetURL);
        cy.visit(widgetURL)
      })
    cy.xpath('//li/ul/li').first().click()
    cy.get('#book-now-btn').click()
    cy.get('#first_name').type(identity.c_name)
    cy.get('#last_name').type(identity.c_surname)
    cy.get('#email').type(identity.c_email)
    cy.get('#mobile').type('0412345678')
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.get('#cc_name').type(`${identity.c_name} ${identity.c_surname}`)
    cy.get('#cc_number').type('4242 4242 4242 4242')
    cy.get('#cc_expiry').type('02/24')
    cy.get('#cc_cvn').type('123')
    cy.get('#stripe_submit').click()
    cy.wait(2000)
    cy.get('.text-capitalize').should(($bookingConfirmation) => {
      expect($bookingConfirmation).to.contain('Booking Confirmed')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($prepaid) => {
      expect($prepaid).to.contain('Amount pre-paid:')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($amountPrepaid) => {
      expect($amountPrepaid).to.contain('$50.00')
    })
    //Change unrestrictted partially prepaid booking
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[2]/a')
      .should('have.attr', 'href')
      .then((href) => {
        var changeBooking = href;
        console.log(changeBooking);
        var changeBookingURL = `https://${Cypress.env('basic_auth').split('@')[0]}@${changeBooking.substring(8, 84)}`
        console.log(changeBookingURL);
        cy.visit(changeBookingURL)
      })

    cy.wait(1000)
    cy.get('button[name=change]').click()
    cy.wait(1000)
    cy.xpath('//*[@id="widgetBooking"]/div[1]/div[3]/div').should(($chanageBookinProgress) => {
      expect($chanageBookinProgress).to.contain('BOOKING CHANGE IN PROGRESS')
    })
    cy.contains('Back to booking').should('be.visible')
    cy.get('.fa-chevron-right').first().click()
    cy.get('button[name=next]').click()
    cy.xpath('//li/ul/li').first().click()
    cy.get('#book-now-btn').click()
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.get('.text-capitalize').should(($bookingConfirmation) => {
      expect($bookingConfirmation).to.contain('Booking Confirmed')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label/strong').should(($refunded) => {
      expect($refunded).to.contain('Amount refunded:')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($refunded) => {
      expect($refunded).to.contain('$50.00')
    })

    //Create unrestrictted FULL prepaid booking
    cy.visit(`https://${Cypress.env('basic_auth')}/merchant/settings/integration/website`)
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[11]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = `https://${Cypress.env('basic_auth').split('@')[0]}@${widgetIframe.substring(419, 490)}`
        console.log(widgetIframe);
        console.log(widgetURL);
        cy.visit(widgetURL)
      })
    cy.wait(500)
    cy.xpath('//li/ul/li').first().click()
    cy.wait(500)
    cy.get('#book-now-btn').click()
    cy.get('#first_name').type(identity.c_name)
    cy.get('#last_name').type(identity.c_surname)
    cy.get('#email').type(identity.c_email)
    cy.get('#mobile').type('0412345678')
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.get('#cc_name').type(`${identity.c_name} ${identity.c_surname}`)
    cy.get('#cc_number').type('4242 4242 4242 4242')
    cy.get('#cc_expiry').type('02/24')
    cy.get('#cc_cvn').type('123')
    cy.get('#stripe_submit').click()
    cy.wait(2000)
    cy.get('.text-capitalize').should(($bookingConfirmation) => {
      expect($bookingConfirmation).to.contain('Booking Confirmed')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($prepaid) => {
      expect($prepaid).to.contain('Paid in full:')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($amountPrepaid) => {
      expect($amountPrepaid).to.contain('$100.00')
    })

    //Change unrestrictted fully prepaid booking
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[2]/a')
      .should('have.attr', 'href')
      .then((href) => {
        var changeBooking = href;
        console.log(changeBooking);
        var changeBookingURL = `https://${Cypress.env('basic_auth').split('@')[0]}@${changeBooking.substring(8, 84)}`
        console.log(changeBookingURL);
        cy.visit(changeBookingURL)
      })
    cy.wait(1000)
    cy.get('button[name=change]').click()
    cy.wait(1000)
    cy.xpath('//*[@id="widgetBooking"]/div[1]/div[3]/div').should(($chanageBookinProgress) => {
      expect($chanageBookinProgress).to.contain('BOOKING CHANGE IN PROGRESS')
    })
    cy.contains('Back to booking').should('be.visible')
    cy.get('.fa-chevron-right').first().click()
    cy.get('button[name=next]').click()
    cy.xpath('//li/ul/li').first().click()
    cy.get('#book-now-btn').click()
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.get('.text-capitalize').should(($bookingConfirmation) => {
      expect($bookingConfirmation).to.contain('Booking Confirmed')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label/strong').should(($refunded) => {
      expect($refunded).to.contain('Amount refunded:')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($refunded) => {
      expect($refunded).to.contain('$100.00')
    })

    //Create restricted partial prepaid booking
    cy.visit(`https://${Cypress.env('basic_auth')}/merchant/settings/integration/website`)
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[12]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = `https://${Cypress.env('basic_auth').split('@')[0]}@${widgetIframe.substring(419, 490)}`
        console.log(widgetIframe);
        console.log(widgetURL);
        cy.visit(widgetURL)
      })
    cy.wait(500)
    cy.xpath('//li/ul/li').first().click()
    cy.wait(500)
    cy.get('#book-now-btn').click()
    cy.get('#first_name').type(identity.c_name)
    cy.get('#last_name').type(identity.c_surname)
    cy.get('#email').type(identity.c_email)
    cy.get('#mobile').type('0412345678')
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.get('#cc_name').type(`${identity.c_name} ${identity.c_surname}`)
    cy.get('#cc_number').type('4242 4242 4242 4242')
    cy.get('#cc_expiry').type('02/24')
    cy.get('#cc_cvn').type('123')
    cy.get('#stripe_submit').click()
    cy.wait(2500)
    cy.get('.text-capitalize').should(($bookingConfirmation) => {
      expect($bookingConfirmation).to.contain('Booking Confirmed')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($prepaid) => {
      expect($prepaid).to.contain('Amount pre-paid:')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($amountPrepaid) => {
      expect($amountPrepaid).to.contain('$50.00')
    })

    //Change restrictted partially prepaid booking
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[2]/a')
      .should('have.attr', 'href')
      .then((href) => {
        var changeBooking = href;
        console.log(changeBooking);
        var changeBookingURL = `https://${Cypress.env('basic_auth').split('@')[0]}@${changeBooking.substring(8, 84)}`
        console.log(changeBookingURL);
        cy.visit(changeBookingURL)
      })
    cy.wait(1000)
    cy.get('button[name=change]').click()
    cy.wait(1000)
    cy.xpath('//*[@id="widgetBooking"]/div[1]/div[3]/div').should(($chanageBookinProgress) => {
      expect($chanageBookinProgress).to.contain('BOOKING CHANGE IN PROGRESS')
    })
    cy.contains('Back to booking').should('be.visible')
    cy.xpath('//li/ul/li').first().click()
    cy.get('#book-now-btn').click()
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.get('.text-capitalize').should(($bookingConfirmation) => {
      expect($bookingConfirmation).to.contain('Booking Confirmed')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($prepaid) => {
      expect($prepaid).to.contain('Amount pre-paid:')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($prepaid) => {
      expect($prepaid).to.contain('$50.00')
    })

    //Create restricted fully prepaid booking
    cy.visit(`https://${Cypress.env('basic_auth')}/merchant/settings/integration/website`)
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[13]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = `https://${Cypress.env('basic_auth').split('@')[0]}@${widgetIframe.substring(419, 490)}`
        console.log(widgetIframe);
        console.log(widgetURL);
        cy.visit(widgetURL)
      })
    cy.wait(500)
    cy.xpath('//li/ul/li').first().click()
    cy.wait(500)
    cy.get('#book-now-btn').click()
    cy.get('#first_name').type(identity.c_name)
    cy.get('#last_name').type(identity.c_surname)
    cy.get('#email').type(identity.c_email)
    cy.get('#mobile').type('0412345678')
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.get('#cc_name').type(`${identity.c_name} ${identity.c_surname}`)
    cy.get('#cc_number').type('4242 4242 4242 4242')
    cy.get('#cc_expiry').type('02/24')
    cy.get('#cc_cvn').type('123')
    cy.get('#stripe_submit').click()
    cy.wait(2500)
    cy.get('.text-capitalize').should(($bookingConfirmation) => {
      expect($bookingConfirmation).to.contain('Booking Confirmed')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($prepaid) => {
      expect($prepaid).to.contain('Paid in full:')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($amountPrepaid) => {
      expect($amountPrepaid).to.contain('$100.00')
    })

    //Change restricted fully prepaid booking
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[2]/a')
      .should('have.attr', 'href')
      .then((href) => {
        var changeBooking = href;
        console.log(changeBooking);
        var changeBookingURL = `https://${Cypress.env('basic_auth').split('@')[0]}@${changeBooking.substring(8, 84)}`
        console.log(changeBookingURL);
        cy.visit(changeBookingURL)
      })
    cy.wait(1000)
    cy.get('button[name=change]').click()
    cy.wait(1000)
    cy.xpath('//*[@id="widgetBooking"]/div[1]/div[3]/div').should(($chanageBookinProgress) => {
      expect($chanageBookinProgress).to.contain('BOOKING CHANGE IN PROGRESS')
    })
    cy.contains('Back to booking').should('be.visible')
    cy.xpath('//li/ul/li').first().click()
    cy.get('#book-now-btn').click()
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.get('.text-capitalize').should(($bookingConfirmation) => {
      expect($bookingConfirmation).to.contain('Booking Confirmed')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($prepaid) => {
      expect($prepaid).to.contain('Paid in full:')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($prepaid) => {
      expect($prepaid).to.contain('$100.00')
    })
  })
})