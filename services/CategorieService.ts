import { get } from "http";
import { Categorie, CategorieETL } from "../model/categorie";
import { localSql } from "../sql";

export async function getCategories(): Promise<Categorie[]> {
    const result = await localSql.query("SELECT * FROM categorie")
        .catch((err) => {
            console.error("Error fetching categories:", err);
            throw err;
        })[0] as Categorie[];

    return result;
}

export function getCategoriesETL(): CategorieETL[] {
    var categoriesETL: CategorieETL[] = [];

    getCategories().then((categories) => {
        for (const categorie of categories) {
            if(categorie.idCategorie === null || categorie.idCategorie === undefined) {
                console.warn("Skipping category with null values:", categorie);
                continue;
            }

            categoriesETL.push({
                idCategorie: categorie.idCategorie,
                nomCategorie: categorie.nomCategorie,
            });
        }
    });

    return categoriesETL;
}

export async function getCategorieById(id: number): Promise<Categorie | null> {
    const result = await localSql.query("SELECT * FROM categorie WHERE idCategorie = ?", [id])
        .catch((err) => {
            console.error("Error fetching category by ID:", err);
            throw err;
        })[0] as Categorie[];

    return result.length > 0 ? result[0] : null;
}

export async function insertCategorie(categorie: Categorie): Promise<Categorie> {
    const result: any = await localSql.query("INSERT INTO categorie (nomCategorie, dateHeureCreation, dateHeureMAJ) VALUES (?, ?, ?)", 
        [categorie.nomCategorie, categorie.dateHeureCreation, categorie.dateHeureMAJ])
        .catch((err) => {
            console.error("Error inserting category:", err);
            throw err;
        });
    return {
        ...categorie,
        idCategorie: result[0].insertId, 
    }
}

export async function insertMultipleCategories(categories: Categorie[]): Promise<Categorie[]> {
    const insertedCategories: Categorie[] = [];
    for (const categorie of categories) {
        const insertedCategory = await insertCategorie(categorie);
        insertedCategories.push(insertedCategory);
    }
    return insertedCategories;
}
