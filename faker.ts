import { faker } from '@faker-js/faker';
import { Categorie } from './model/categorie';
import { Compte } from './model/compte';
import { Mouvement } from './model/mouvement';
import { SousCategorie } from './model/souscategorie';
import { Tiers } from './model/tiers';

function generateCategorie(): Categorie {
    return {
        idCategorie: faker.number.int({ min: 1, max: 1000 }),
        nomCategorie: faker.commerce.department(),
        dateHeureCreation: faker.date.past(),
        dateHeureMAJ: faker.date.recent(),
    }
}

export function generateCategories(count: number): Categorie[] {
    return Array.from({ length: count }, generateCategorie);
}

function generateCompte(): Compte {
    return {
        idCompte: faker.number.int({ min: 1, max: 1000 }),
        nomBanque: faker.company.name(),
        descriptionCompte: faker.lorem.sentence(),
        idUtilisateur: 1,
        dateHeureCreation: faker.date.past(),
        dateHeureMAJ: faker.date.recent(),
    }
}

function generateComptes(count: number): Compte[] {
    return Array.from({ length: count }, generateCompte);
}

function generateMouvement(idCompte: number, idCategorie: number): Mouvement {
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

function generateMouvements(count: number, idCompte: number, idCategorie: number) : Mouvement[] {
    return Array.from({ length: count }, () => generateMouvement(idCompte, idCategorie));
}

function generateSousCategorie(idCategorie: number): SousCategorie {
    return {
        idSousCategorie: faker.number.int({ min: 1, max: 1000 }),
        idCategorie,
        nomSousCategorie: faker.commerce.productName(),
        dateHeureCreation: faker.date.past(),
        dateHeureMAJ: faker.date.recent(),
    }
}

function generateSousCategories(count: number, idCategorie: number): SousCategorie[] {
    return Array.from({ length: count }, () => generateSousCategorie(idCategorie));
}

function generateTiers(): Tiers {
    return {
        idTiers: faker.number.int({ min: 1, max: 1000 }),
        nomTiers: faker.company.name(),
        idUtilisateur: 1,
        dateHeureCreation: faker.date.past(),
        dateHeureMAJ: faker.date.recent(),
    }
}

function generateTiersList(count: number): Tiers[] {
    return Array.from({ length: count }, generateTiers);
}

