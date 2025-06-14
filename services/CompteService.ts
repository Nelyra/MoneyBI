import sql from "../mysql";
import { Compte } from "../model/compte";

export async function getComptes(): Promise<Compte[]> {
    const result = await sql.query("SELECT * FROM compte")
        .catch((err) => {
            console.error("Error fetching comptes:", err);
            throw err;
        })[0] as Compte[];

    return result;
}

export async function getCompteById(id: number): Promise<Compte | null> {
    const result = await sql.query("SELECT * FROM compte WHERE idCompte = ?", [id])
        .catch((err) => {
            console.error("Error fetching compte by ID:", err);
            throw err;
        })[0] as Compte[];

    return result.length > 0 ? result[0] : null;
}

export async function insertCompte(compte: Compte): Promise<Compte> {
    const result: any = await sql.query("INSERT INTO compte (idUtilisateur, descriptionCompte, nomBanque, dateHeureCreation, dateHeureMAJ) VALUES (?, ?, ?, ?, ?)", 
        [compte.idUtilisateur, compte.descriptionCompte, compte.nomBanque, compte.dateHeureCreation, compte.dateHeureMAJ])
        .catch((err) => {
            console.error("Error inserting compte:", err);
            throw err;
        });
    return {
        ...compte,
        idCompte: result[0].insertId,
    };
}

export async function insertMultipleComptes(comptes: Compte[]): Promise<Compte[]> {
    const insertedComptes: Compte[] = [];
    for (const compte of comptes) {
        const insertedCompte = await insertCompte(compte);
        insertedComptes.push(insertedCompte);
    }
    return insertedComptes;
}