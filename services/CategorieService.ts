import { Categorie } from "../model/categorie";
import sql from "../mysql";

export async function getCategories(): Promise<Categorie[]> {
    const result = (await sql.query("SELECT * FROM categorie")
        .catch((err) => {
            console.error("Error fetching categories:", err);
            throw err;
        }))[0] as Categorie[];

    return result;
}

export async function getCategorieById(id: number): Promise<Categorie | null> {
    const result = (await sql.query("SELECT * FROM categorie WHERE idCategorie = ?", [id])
        .catch((err) => {
            console.error("Error fetching category by ID:", err);
            throw err;
        }))[0] as Categorie[];

    return result.length > 0 ? result[0] : null;
}

