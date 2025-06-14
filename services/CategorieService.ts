import { ResultSetHeader } from "mysql2";
import { Categorie } from "../model/categorie";
import sql from "../mysql";

export async function getCategories(): Promise<Categorie[]> {
    const result = await sql.query("SELECT * FROM categorie")
        .catch((err) => {
            console.error("Error fetching categories:", err);
            throw err;
        })[0] as Categorie[];

    return result;
}

export async function getCategorieById(id: number): Promise<Categorie | null> {
    const result = await sql.query("SELECT * FROM categorie WHERE idCategorie = ?", [id])
        .catch((err) => {
            console.error("Error fetching category by ID:", err);
            throw err;
        })[0] as Categorie[];

    return result.length > 0 ? result[0] : null;
}

export async function insertCategorie(categorie: Categorie): Promise<Categorie> {
    const result: any = await sql.query("INSERT INTO categorie (nomCategorie, dateHeureCreation, dateHeureMAJ) VALUES (?, ?, ?)", 
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

