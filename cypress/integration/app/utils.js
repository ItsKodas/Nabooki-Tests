import faker from 'faker'

export function Identity() {
    return {
        address_1: faker.address.streetAddress(),
        suburb: faker.address.city(),
        postcode: faker.address.zipCode(),
        c_name: faker.name.firstName(),
        c_surname: faker.name.lastName(),
        c_email: `success+${this.c_name}+${this.c_surname}@simulator.amazonses.com`.toLowerCase(),
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        email: `success+${this.first}+${this.last}@simulator.amazonses.com`.toLowerCase()
    }
}