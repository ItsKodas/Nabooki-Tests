import faker from 'faker'

export function Identity() {
    
    var c_name = faker.name.firstName()
    var c_surname = faker.name.lastName()
    
    var first = faker.name.firstName()
    var last = faker.name.lastName()
    
    return {
        address_1: faker.address.streetAddress(),
        suburb: faker.address.city(),
        postcode: faker.address.zipCode(),
        c_name: c_name,
        c_surname: c_surname,
        c_email: `success+${c_name}+${c_surname}@simulator.amazonses.com`.toLowerCase(),
        first: first,
        last: last,
        email: `success+${first}+${last}@simulator.amazonses.com`.toLowerCase()
    }
}