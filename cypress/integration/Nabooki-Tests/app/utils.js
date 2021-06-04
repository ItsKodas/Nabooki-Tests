import faker from 'faker'

export function Credentials() {
    return {
        address_1: faker.address.streetAddress(),
        suburb: faker.address.city(),
        postcode: faker.address.zipCode(),
        c_name: faker.name.firstName(),
        c_surname: faker.name.lastName(),
        c_email: `success+${c_name}+${c_surname}@simulator.amazonses.com`.toLowerCase(),
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        email: `success+${first}+${last}@simulator.amazonses.com`.toLowerCase()
    }
}