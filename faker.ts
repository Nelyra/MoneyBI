import { faker } from '@faker-js/faker';
import { Categorie } from './model/categorie';
import { Compte } from './model/compte';
import { Mouvement } from './model/mouvement';
import { SousCategorie } from './model/souscategorie';
import { Tiers } from './model/tiers';
import { Utilisateur } from './model/utilisateur';

const DATE_START: Date = new Date(2022, 0, 1);

function generateCategorie(): Categorie {
    return {
        nomCategorie: faker.commerce.department(),
        dateHeureCreation: DATE_START,
        dateHeureMAJ: DATE_START,
    }
}

export function generateCategories(count: number): Categorie[] {
    return Array.from({ length: count }, generateCategorie);
}

function generateCompte(): Compte {
    return {
        nomBanque: faker.company.name(),
        descriptionCompte: faker.lorem.sentence(),
        idUtilisateur: 1,
        dateHeureCreation: DATE_START,
        dateHeureMAJ: DATE_START,
    }
}

export function generateComptes(count: number): Compte[] {
    return Array.from({ length: count }, generateCompte);
}

function generateMouvement(idCompte: number, sousCategorie: SousCategorie, nbTiers: number): Mouvement {
    if(sousCategorie.idSousCategorie === undefined || sousCategorie.idSousCategorie === null) {
        throw new Error("SousCategorie must have a valid idSousCategorie");
    }

    const dateMouvement = faker.date.between({
        from: DATE_START,
        to: Date.now()
    })

    return {
        idCompte,
        idTiers: faker.number.int({ min: 1, max: nbTiers }),
        idSousCategorie: sousCategorie.idSousCategorie,
        idCategorie: sousCategorie.idCategorie,
        idVirement: null,
        montant: parseFloat(faker.commerce.price()),
        typeMouvement: faker.helpers.arrayElement(['D', 'C']),
        dateMouvement: dateMouvement,
        dateHeureCreation: dateMouvement,
        dateHeureMAJ: dateMouvement,
    }
}

export function generateMouvements(count: number, nbComptes: number, sousCategories: SousCategorie[], nbTiers: number) : Mouvement[] {
    return Array.from({ length: count }, () => generateMouvement(faker.number.int({min: 1, max: nbComptes}), faker.helpers.arrayElement(sousCategories), nbTiers));
}

function generateSousCategorie(idCategorie: number): SousCategorie {
    return {
        idCategorie,
        nomSousCategorie: faker.commerce.productName(),
        dateHeureCreation: DATE_START,
        dateHeureMAJ: DATE_START,
    }
}

export function generateSousCategories(count: number, nbCategorie: number): SousCategorie[] {
    return Array.from({ length: count }, () => generateSousCategorie(faker.number.int({ min: 1, max: nbCategorie })));
}

function generateTiers(): Tiers {
    return {
        nomTiers: faker.company.name(),
        idUtilisateur: 1,
        dateHeureCreation: DATE_START,
        dateHeureMAJ: DATE_START,
    }
}

export function generateTiersList(count: number): Tiers[] {
    return Array.from({ length: count }, generateTiers);
}

export function generateUtilisateur(): Utilisateur {
    return {
        idUtilisateur: 1,
        nomUtilisateur: faker.person.lastName(),
        prenomUtilisateur: faker.person.firstName(),
        login: faker.internet.username(),
        mdp: faker.internet.password(),
        ville: faker.location.city(),
        codePostal: faker.location.zipCode(),
        dateHeureCreation: DATE_START,
        dateHeureMAJ: DATE_START,
    }
}

