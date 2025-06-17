import sql from "../mysql";
import { SousCategorie } from "../model/souscategorie";

export async function getSousCategories(): Promise<SousCategorie[]> {
    const result = (await sql.query("SELECT * FROM souscategorie")
        .catch((err) => {
            console.error("Error fetching souscategories:", err);
            throw err;
        }))[0] as SousCategorie[];

    return result;
}

export async function getSousCategorieById(id: number): Promise<SousCategorie | null> {
    const result = await sql.query("SELECT * FROM souscategorie WHERE idSousCategorie = ?", [id])
        .catch((err) => {
            console.error("Error fetching souscategorie by ID:", err);
            throw err;
        })[0] as SousCategorie[];

    return result.length > 0 ? result[0] : null;
}

export async function insertSousCategorie(sousCategorie: SousCategorie): Promise<SousCategorie> {
    const result: any = await sql.query("INSERT INTO souscategorie (idCategorie, nomSousCategorie, dateHeureCreation, dateHeureMAJ) VALUES (?, ?, ?, ?)", 
        [sousCategorie.idCategorie, sousCategorie.nomSousCategorie, sousCategorie.dateHeureCreation, sousCategorie.dateHeureMAJ])
        .catch((err) => {
            console.error("Error inserting souscategorie:", err);
            throw err;
        });
    return {
        ...sousCategorie,
        idSousCategorie: result[0].insertId,
    };
}

export async function insertMultipleSousCategories(sousCategories: SousCategorie[]): Promise<SousCategorie[]> {
    const insertedSousCategories: SousCategorie[] = [];
    for (const sousCategorie of sousCategories) {
        const insertedSousCategorie = await insertSousCategorie(sousCategorie);
        insertedSousCategories.push(insertedSousCategorie);
    }
    return insertedSousCategories;
}

