import 'cypress-iframe'

export function setupSession() {
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
}

export function setupSchedual() {
    //Setup Schedule Service
    cy.visit(`https://${Cypress.env('basic_auth')}/merchant/settings/services`)
    cy.get('.fa-user-plus').click({ force: true })
    cy.get('#name').type('Test Schedule Service')
    cy.get('#duration_hours').select('1 hrs')
    cy.get('#price').type('100')
    cy.get('#btn-services-general').click()
    cy.wait(1000)
    cy.get('[data-time="09:00:00"]').click()

    //cy.get('#manageServiceLocationScheduleEventModal iframe').click()
    cy.get('#manageServiceLocationScheduleEventModal iframe').invoke('text')
        .then((text) => {
            var widgetIframe = text;
            var widgetURL = `https://${Cypress.env('basic_auth').split('@')[0]}@${widgetIframe.substring(419, 490)}`
            console.log(widgetIframe);
            console.log(widgetURL);
            cy.visit(widgetURL)

        })

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
}

export function setupSubService() {
    //Setup Sub-Service
    cy.xpath('//tr[4]/td[6]/div/button').click()
    cy.contains('Add sub-service').click()
    cy.get('#name').type(' - Based off')
    cy.get('#price').type('90')
    cy.get('#btn-services-general').click()
    cy.get('#btn-offer-availability-submit').click()
    cy.wait(2000)
}

export function setupPriceCategories() {
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
}

export function setupUnrestrictedPartialPrepayment() {
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
}

export function setupUnrestrictedFullPrepayment() {
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
}

export function setupRestrictedPartialPrepayment() {
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
}

export function setupRestrictedFullPrepayment() {
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
}

export function setupPrivateGroupBooking() {
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
}

export function setupServiceOptionsSubOptions() {
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
}