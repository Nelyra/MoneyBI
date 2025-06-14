// script to generate test data for bdd
import { generateUtilisateur, 
    generateCategories, 
    generateSousCategories, 
    generateComptes 
} from "./faker";

import { emptyTables } from "./services/EmptyService";

import { makeUtilisateur } from "./services/UtilisateurService";
import { insertMultipleCategories } from "./services/CategorieService";
import { insertMultipleSousCategories } from "./services/SousCategorieService";
import { insertMultipleComptes } from "./services/CompteService";
import { exit } from "process";

async function generateTestData() {
    try {
        await emptyTables();

        await makeUtilisateur(generateUtilisateur());
        const categories = await insertMultipleCategories(generateCategories(10));
        const sousCategories = await insertMultipleSousCategories(generateSousCategories(10, categories.length));

        const comptes = await insertMultipleComptes(generateComptes(10));

        console.log("Test data generated successfully.");
        exit(0);
    } catch (error) {
        console.error("Error generating test data:", error);
        exit(1);
    }
}

generateTestData();
console.log('Meow...');
