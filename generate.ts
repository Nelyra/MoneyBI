// script to generate test data for bdd
import { getCategories } from "./services/CategorieService";

async function generateTestData() {
    try {
        const categories = await getCategories();
        console.log("Categories:", categories);
    } catch (error) {
        console.error("Error generating test data:", error);
    }
}

generateTestData();

console.log('Meow...');