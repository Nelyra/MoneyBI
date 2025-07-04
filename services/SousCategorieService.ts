import { localSql, etlSql } from "../sql";
import { SousCategorie, SousCategorieETL } from "../model/souscategorie";

export async function getSousCategories(): Promise<SousCategorie[]> {
    const result = (await localSql.query("SELECT * FROM souscategorie")
        .catch((err) => {
            console.error("Error fetching souscategories:", err);
            throw err;
        }))[0] as SousCategorie[];

    return result;
}

export async function getSousCategoriesETL(): Promise<SousCategorieETL[]> {
    const sousCategoriesETL: SousCategorieETL[] = [];
    const sousCategories = await getSousCategories();

        for (const sousCategorie of sousCategories) {
        if (sousCategorie.idSousCategorie === null || sousCategorie.idSousCategorie === undefined) {
            console.warn("Skipping souscategorie with null values:", sousCategorie);
            continue;
        }

        sousCategoriesETL.push({
            idSousCategorie: sousCategorie.idSousCategorie,
            idCategorie: sousCategorie.idCategorie,
            nomSousCategorie: sousCategorie.nomSousCategorie,
        });
    }

    return sousCategoriesETL;
}

export async function getSousCategorieById(id: number): Promise<SousCategorie | null> {
    const result = await localSql.query("SELECT * FROM souscategorie WHERE idSousCategorie = ?", [id])
        .catch((err) => {
            console.error("Error fetching souscategorie by ID:", err);
            throw err;
        })[0] as SousCategorie[];

    return result.length > 0 ? result[0] : null;
}

export async function insertSousCategorie(sousCategorie: SousCategorie): Promise<SousCategorie> {
    const result: any = await localSql.query("INSERT INTO souscategorie (idCategorie, nomSousCategorie, dateHeureCreation, dateHeureMAJ) VALUES (?, ?, ?, ?)", 
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

export async function insertETLSousCategorie(sousCategorie: SousCategorieETL): Promise<SousCategorieETL> {
    const result: any = await etlSql.query("INSERT INTO souscategorie (idSousCategorie, idCategorie, nomSousCategorie) VALUES (?, ?, ?)",
        [sousCategorie.idSousCategorie, sousCategorie.idCategorie, sousCategorie.nomSousCategorie])
        .catch((err) => {
            console.error("Error inserting ETL souscategorie:", err);
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

export async function insertMultipleETLSousCategories(sousCategoriesETL: SousCategorieETL[]): Promise<SousCategorieETL[]> {
    const insertedSousCategoriesETL: SousCategorieETL[] = [];
    for (const sousCategorieETL of sousCategoriesETL) {
        const insertedSousCategorieETL = await insertETLSousCategorie(sousCategorieETL);
        insertedSousCategoriesETL.push(insertedSousCategorieETL);
    }
    return insertedSousCategoriesETL;
}

