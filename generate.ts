// script to generate test data for bdd
import { getCategories, insertCategorie } from "./services/CategorieService";
import { generateCategories } from "./faker";

async function generateTestData() {
    try {
        const categories = generateCategories(10);
        for (const categorie of categories) {
            const result = await insertCategorie(categorie);
            console.log(`Inserted category: ${result.nomCategorie} with ID: ${result.idCategorie}`);
        }

    } catch (error) {
        console.error("Error generating test data:", error);
    }
}

generateTestData(); 

console.log('Meow...');