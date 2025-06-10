import { faker } from '@faker-js/faker';

const generateUser = () => {
    return {
        idUtilisateur: faker.string.uuid(),
    }
}
