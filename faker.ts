import { faker } from '@faker-js/faker';

const generateCategorie = () => {
    return {
        idCategorie: faker.number.int({ min: 1, max: 1000 }),
        nomCategorie: faker.commerce.department(),
        dateHeureCreation: faker.date.past(),
        dateHeureMAJ: faker.date.recent(),
    }
}

const generateCategories = (count: number) => {
    return Array.from({ length: count }, generateCategorie);
}

const generateCompte = () => {
    return {
        idCompte: faker.number.int({ min: 1, max: 1000 }),
        nomBanque: faker.company.name(),
        descriptionCompte: faker.lorem.sentence(),
        idUtilisateur: 1,
        dateHeureCreation: faker.date.past(),
        dateHeureMAJ: faker.date.recent(),
    }
}

const generateComptes = (count: number) => {
    return Array.from({ length: count }, generateCompte);
}

const generateMouvement = (idCompte: number, idCategorie: number) => {
    return {
        idMouvement: faker.number.int({ min: 1, max: 1000 }),
        idCompte,
        idTiers: faker.number.int({ min: 1, max: 1000 }),
        idSousCategorie: faker.number.int({ min: 1, max: 1000 }),
        idCategorie,
        idVirement: faker.number.int({ min: 1, max: 1000 }),
        montant: parseFloat(faker.commerce.price()),
        typeMouvement: faker.helpers.arrayElement(['D', 'C']),
        dateMouvement: faker.date.past(),
        dateHeureCreation: faker.date.past(),
        dateHeureMAJ: faker.date.recent(),
    }
}

const generateMouvements = (count: number, idCompte: number, idCategorie: number) => {
    return Array.from({ length: count }, () => generateMouvement(idCompte, idCategorie));
}

const generateSousCategorie = (idCategorie: number) => {
    return {
        idSousCategorie: faker.number.int({ min: 1, max: 1000 }),
        idCategorie,
        nomSousCategorie: faker.commerce.productName(),
        dateHeureCreation: faker.date.past(),
        dateHeureMAJ: faker.date.recent(),
    }
}

const generateSousCategories = (count: number, idCategorie: number) => {
    return Array.from({ length: count }, () => generateSousCategorie(idCategorie));
}

const generateTiers = () => {
    return {
        idTiers: faker.number.int({ min: 1, max: 1000 }),
        nomTiers: faker.company.name(),
        idUtilisateur: 1,
        dateHeureCreation: faker.date.past(),
        dateHeureMAJ: faker.date.recent(),
    }
}

const generateTiersList = (count: number) => {
    return Array.from({ length: count }, generateTiers);
}

