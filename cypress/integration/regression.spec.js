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


    

    
  })
})