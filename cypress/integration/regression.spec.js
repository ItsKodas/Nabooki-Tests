require('cypress-iframe')
require('cypress-xpath')

import * as utils from './app/utils'
import * as auth from './ui/auth'
import * as payment from './ui/payment'
import * as booking from './ui/booking'


describe('E2E', () => {

  var identity = new utils.Identity()


  it('Merchant - Non Restaurant', () => {

    //auth.signup(identity)
    auth.login()
    payment.setup()
    booking.add()

    require('./ui/addBookings')(identity)

    //Setup session service
    cy.contains('Setup').click({ force: true })
    cy.contains('Services').click({ force: true })
    cy.get('.fa-sitemap').click({ force: true })
    cy.get('#name').type('Test Session Service')
    cy.get('#duration_hours').select('1 hrs')
    cy.get('#price').type('100')
    cy.get('#btn-service-advanced-settings').click()
    cy.get('#multiple_sessions_yes').click()
    cy.get('#number_of_sessions').select('10 Sessions')
    cy.get('#btn-services-general').click()

    //Setup Payment Service
    cy.get('.fa-sitemap').click({ force: true })
    cy.get('#name').type('Test Payment Service')
    cy.get('#duration_hours').select('1 hrs')
    cy.get('#price').type('100')
    cy.get('#btn-services-general').click()
    cy.xpath('//tr[3]/td[6]/div/button').click()
    cy.xpath('//tr[3]/td[6]/div/ul/li[1]/a').click()
    cy.contains('Booking Preferences').click()
    cy.get('#accept_payment_yes').click()
    cy.get('#btn-services-general').click()
    cy.get('.breadcrumb > :nth-child(2) > a').click()

    //Setup Schedule Service   
    cy.get('.fa-user-plus').click({ force: true })
    cy.get('#name').type('Test Schedule Service')
    cy.get('#duration_hours').select('1 hrs')
    cy.get('#price').type('100')
    cy.get('#btn-services-general').click()
    cy.wait(1000)
    cy.get('[data-time="09:00:00"]').click()

    cy.iframe('#manageServiceLocationScheduleEventModal iframe').find('').type('0412345678')

    cy.wait(1000)
    cy.xpath('//*[@id="schedule_2_09:00"]').click()
    cy.get('.editable-checklist > div:nth-child(1) > label').click({ force: true })
    cy.get('.editable-submit').click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[@id="schedule_3_09:00"]').click()
    cy.wait(1000)
    cy.get('.editable-checklist > div:nth-child(1) > label').click({ force: true })
    cy.get('.editable-submit').click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[@id="schedule_4_09:00"]').click()
    cy.wait(1000)
    cy.get(':nth-child(1) > label > input').click({ force: true })
    cy.get('.editable-submit').click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[@id="schedule_5_09:00"]').click()
    cy.wait(1000)
    cy.get(':nth-child(1) > label > input').click({ force: true })
    cy.wait(1000)
    cy.get('.editable-submit').click({ force: true })
    cy.get('#btn-services-availability').click()

    //Setup Sub-Service
    cy.xpath('//tr[4]/td[6]/div/button').click()
    cy.contains('Add sub-service').click()
    cy.get('#name').type(' - Based off')
    cy.get('#price').type('90')
    cy.get('#btn-services-general').click()
    cy.get('#btn-offer-availability-submit').click()
    cy.wait(2000)

    //Setup a service with price categories
    cy.get('.fa-user-plus').click({ force: true })
    cy.get('#name').type('Test Price Category Service')
    cy.get('#duration_hours').select('1 hrs')
    cy.get('#price').type('100')
    cy.get('#btn-services-general').click()
    cy.wait(1000)
    cy.xpath('//*[@id="schedule_1_10:00"]').click()
    cy.wait(1000)
    cy.get(':nth-child(1) > label > span').click({ force: true })
    cy.wait(1000)
    cy.get('.editable-submit').click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[@id="schedule_2_10:00"]').click()
    cy.wait(1000)
    cy.get('.editable-checklist > div:nth-child(1) > label').click({ force: true })
    cy.wait(1000)
    cy.get('.editable-submit').click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[@id="schedule_3_10:00"]').click()
    cy.wait(1000)
    cy.get('.editable-checklist > div:nth-child(1) > label').click({ force: true })
    cy.wait(1000)
    cy.get('.editable-submit').click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[@id="schedule_4_10:00"]').click()
    cy.wait(1000)
    cy.get(':nth-child(1) > label > input').click({ force: true })
    cy.wait(1000)
    cy.get('.editable-submit').click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[@id="schedule_5_10:00"]').click()
    cy.wait(1000)
    cy.get(':nth-child(1) > label > input').click({ force: true })
    cy.wait(1000)
    cy.get('.editable-submit').click({ force: true })
    cy.wait(1000)
    cy.get('#btn-services-availability').click()
    cy.wait(1000)
    cy.xpath('//tr[6]/td[6]/div/a/span').click()
    cy.get('.modal-link').click()
    cy.frameLoaded('#pricingManagementModal > div > div > div.modal-body > iframe')
    cy.wait(1000)
    cy.iframe('#pricingManagementModal > div > div > div.modal-body > iframe').find('#ID1_price').type('80')
    cy.iframe('#pricingManagementModal > div > div > div.modal-body > iframe').find('#ID1_category_name').type('Child')
    cy.iframe('#pricingManagementModal > div > div > div.modal-body > iframe').find('#btnAdd').click()
    cy.wait(500)
    cy.iframe('#pricingManagementModal > div > div > div.modal-body > iframe').find('#ID2_price').type('100')
    cy.iframe('#pricingManagementModal > div > div > div.modal-body > iframe').find('#ID2_category_name').type('Adult')
    cy.iframe('#pricingManagementModal > div > div > div.modal-body > iframe').find('#btnUpdate').click()
    cy.wait(4000)
    cy.get('.breadcrumb > :nth-child(2) > a').click({ force: true })
    cy.wait(1000)

    //Setup a service with Unrestricted Partial Prepayment
    cy.get('.fa-sitemap').click({ force: true })
    cy.get('#name').type('Unrestricted Partial Prepayment Service')
    cy.get('#duration_hours').select('1 hrs')
    cy.get('#price').type('100')
    cy.get('#btn-services-general').click()
    cy.xpath('//tr[7]/td[6]/div/a/span').click()
    cy.contains('Booking Preferences').click()
    cy.get('#cancellation_time').select('No limit')
    cy.get('#accept_payment_yes').click()
    cy.get('#is_partial_payment').select('Partial prepayment')
    cy.get('#partial_payment_percent_50').click()
    cy.get('#restricted_change_cancel_policy').select('Unrestricted')
    cy.get('#btn-services-general').click()
    cy.get('.breadcrumb > :nth-child(2) > a').click()

    //Setup a service with Unrestricted Full Prepayment
    cy.get('.fa-sitemap').click({ force: true })
    cy.get('#name').type('Unrestricted Full Prepayment Service')
    cy.get('#duration_hours').select('1 hrs')
    cy.get('#price').type('100')
    cy.get('#btn-services-general').click()
    cy.xpath('//tr[8]/td[6]/div/a/span').click()
    cy.contains('Booking Preferences').click()
    cy.get('#cancellation_time').select('No limit')
    cy.get('#accept_payment_yes').click()
    cy.get('#restricted_change_cancel_policy').select('Unrestricted')
    cy.get('#btn-services-general').click()
    cy.get('.breadcrumb > :nth-child(2) > a').click()

    //Setup a service with Restricted Partial Prepayment
    cy.get('.fa-sitemap').click({ force: true })
    cy.get('#name').type('Restricted Partial Prepayment Service')
    cy.get('#duration_hours').select('1 hrs')
    cy.get('#price').type('100')
    cy.get('#btn-services-general').click()
    cy.xpath('//tr[9]/td[6]/div/a/span').click()
    cy.contains('Booking Preferences').click()
    cy.get('#cancellation_time').select('No limit')
    cy.get('#accept_payment_yes').click()
    cy.get('#is_partial_payment').select('Partial prepayment')
    cy.get('#partial_payment_percent_50').click()
    cy.get('#restricted_change_cancel_policy').select('Restricted')
    cy.get('#btn-services-general').click()
    cy.get('.breadcrumb > :nth-child(2) > a').click()

    //Setup a service with Restricted Full Prepayment
    cy.get('.fa-sitemap').click({ force: true })
    cy.get('#name').type('Restricted Full Prepayment Service')
    cy.get('#duration_hours').select('1 hrs')
    cy.get('#price').type('100')
    cy.get('#btn-services-general').click()
    cy.wait(1000)
    cy.xpath('//tr[10]/td[6]/div/a/span').click()
    cy.contains('Booking Preferences').click()
    cy.get('#cancellation_time').select('No limit')
    cy.get('#accept_payment_yes').click()
    cy.get('#btn-services-general').click()
    cy.get('.breadcrumb > :nth-child(2) > a').click()
    cy.wait(1000)

    //Setup a private group booking service
    cy.contains('Setup').click({ force: true })
    cy.contains('Resources').click({ force: true })
    cy.wait(2000)
    cy.xpath('//tr/td[4]/div/button/span[2]').first().click({ force: true })
    cy.wait(2000)
    cy.xpath('//*[@id="customId_0"]/td[4]/div/ul/li[1]/a/span').click({ force: true })
    cy.get('.label_capacity_manageable').click({ force: true })
    cy.get('#capacity_min').click().should('be.visible').type('1')
    cy.get('#capacity_max').click().should('be.visible').type('10')
    cy.get('#btn-staff-and-resources-general').click()
    cy.wait(2000)
    cy.contains('Services').click({ force: true })
    cy.get('.fa-cube').click({ force: true })
    cy.get('#name').type('Private Group Booking Service')
    cy.get('#service_booking_type_id').select('Private group bookings (e.g. restaurant reservation)')
    cy.get('#duration_hours').select('1 hrs')
    cy.get('#price').type('100')
    cy.get('#btn-services-general').click()
    cy.wait(1000)
    cy.get('#btn-services-availability').click()
    cy.wait(1000)

    //Setup a service with options and sub-options
    cy.get('.fa-sitemap').click({ force: true })
    cy.get('#has_options_yes').click()
    cy.wait(1000)
    cy.get('#option_1_name').type('Option 1')
    cy.get('#name').type('Option/Sub-option service')
    cy.get('#option_1_duration_hours').select('1 hrs')
    cy.get('#option_1_price').type('100')
    cy.get('#btnAddOption').click()
    cy.get('#option_2_has_choices_yes').click()
    cy.get('#option_2_name').type('Option 2')
    cy.get('#option_2_choice_1_name').type('2.1')
    cy.get('#option_2_choice_1_duration_hours').select('1 hrs')
    cy.get('#option_2_choice_1_price').type('90')
    cy.get('#ID2_option_btnAddChoice').click()
    cy.get('#option_2_choice_2_name').type('2.2')
    cy.get('#option_2_choice_2_duration_hours').select('1 hrs')
    cy.get('#option_2_choice_2_price').type('110')
    cy.get('#btn-services-general').click()
    cy.wait(2000)

    //Create Session booking
    cy.visit('https://groupon:groupontesting123@hotfix.nabooki.com/merchant/settings/integration/website')
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[5]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = 'https://groupon:groupontesting123@' + widgetIframe.substring(419, 490);
        console.log(widgetIframe);
        console.log(widgetURL);
        cy.visit(widgetURL)

      })
    cy.wait(2000)
    cy.get('#select_session').should('be.disabled')
    cy.get('#book-now-btn').should('be.hidden')
    cy.xpath('//li/ul/li').first().click()
    cy.get('#select_session').click()
    cy.wait(2000)
    cy.xpath('//li/ul/li').first().click()
    cy.get('#select_session').click()
    cy.wait(2000)
    cy.get('#booking_sessions_count').should('have.text', 2)
    cy.get('#booking_sessions_count').click()
    cy.wait(1000)
    cy.get('.remove-booking-session').should('be.visible')
    cy.get('.close').click()
    cy.get('#book-now-btn').click()
    cy.get('#booking_sessions_count').click()
    cy.wait(1000)
    cy.get('.popover-content').should('not.have.class', '.remove-booking-session')
    cy.get('.close').click()
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
    // // cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[2]/ul/li[2]').should(($sessionBooked) => {
    // // expect($sessionBooked).to.contain('2\n of 10 Sessions\n booked')
    // // })

    // // cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[2]/ul/li[3]').should(($sessionRemaining) => {
    // // expect($sessionRemaining).to.contain('8 sessions remaining')
    // // })

    //Create Prepaid booking
    cy.visit('https://groupon:groupontesting123@hotfix.nabooki.com/merchant/settings/integration/website')
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[6]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = 'https://groupon:groupontesting123@' + widgetIframe.substring(419, 490);
        console.log(widgetIframe);
        console.log(widgetURL);
        cy.visit(widgetURL)
      })
    cy.wait(2000)
    cy.xpath('//li/ul/li').first().click()
    cy.get('#book-now-btn').click()
    cy.get('#first_name').type(identity.c_name)
    cy.get('#last_name').type(identity.c_surname)
    cy.get('#email').type(identity.c_email)
    cy.get('#mobile').type('0412345678')
    cy.get('button[type=submit]').click()
    cy.wait(3000)
    cy.get('#cc_name').type(`${identity.c_name} ${identity.c_surname}`)
    cy.get('#cc_number').type('4242 4242 4242 4242')
    cy.get('#cc_expiry').type('02/24')
    cy.get('#cc_cvn').type('123')
    cy.get('#stripe_submit').click()
    cy.wait(2000)
    cy.get('.text-capitalize').should(($bookingConfirmation) => {
      expect($bookingConfirmation).to.contain('Booking Confirmed')
    })
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[3]/label').should(($prePaid) => {
      expect($prePaid).to.contain('Paid in full')
      expect($prePaid).to.contain('$100.00')
    })

    //Create a class booking
    cy.visit('https://groupon:groupontesting123@hotfix.nabooki.com/merchant/settings/integration/website')
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[7]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = 'https://groupon:groupontesting123@' + widgetIframe.substring(419, 490);
        console.log(widgetIframe);
        console.log(widgetURL);
        cy.visit(widgetURL)
      })
    cy.wait(1500)
    cy.get('button[type=submit]').first().click()
    cy.wait(1000)
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
    cy.xpath('//*[@id="bodyBookingwidget"]/div[3]/div[1]/div/div[2]/div[2]/ul/li[2]').should(($twopplbooked) => {
      expect($twopplbooked).to.contain('Number of people: 2')
    })

    //Create a booking for a sub-service
    cy.visit('https://groupon:groupontesting123@hotfix.nabooki.com/merchant/settings/integration/website')
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[8]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = 'https://groupon:groupontesting123@' + widgetIframe.substring(419, 490);
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
    cy.visit('https://groupon:groupontesting123@hotfix.nabooki.com/merchant/settings/integration/website')
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[9]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = 'https://groupon:groupontesting123@' + widgetIframe.substring(419, 490);
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
    cy.visit('https://groupon:groupontesting123@hotfix.nabooki.com/merchant/settings/integration/website')
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[10]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = 'https://groupon:groupontesting123@' + widgetIframe.substring(419, 490);
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
        var changeBookingURL = 'https://groupon:groupontesting123@' + changeBooking.substring(8, 84);
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
    cy.visit('https://groupon:groupontesting123@hotfix.nabooki.com/merchant/settings/integration/website')
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[11]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = 'https://groupon:groupontesting123@' + widgetIframe.substring(419, 490);
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
        var changeBookingURL = 'https://groupon:groupontesting123@' + changeBooking.substring(8, 84);
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
    cy.visit('https://groupon:groupontesting123@hotfix.nabooki.com/merchant/settings/integration/website')
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[12]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = 'https://groupon:groupontesting123@' + widgetIframe.substring(419, 490);
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
        var changeBookingURL = 'https://groupon:groupontesting123@' + changeBooking.substring(8, 84);
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
    cy.visit('https://groupon:groupontesting123@hotfix.nabooki.com/merchant/settings/integration/website')
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/button/span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="multiselect-widget_options-required-container"]/ul/li[13]/a/label').click()
    cy.get('.embed-calendar').filter(':visible').click()
    cy.get('.embed-calendar').invoke('text')
      .then((text) => {
        var widgetIframe = text;
        var widgetURL = 'https://groupon:groupontesting123@' + widgetIframe.substring(419, 490);
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
        var changeBookingURL = 'https://groupon:groupontesting123@' + changeBooking.substring(8, 84);
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