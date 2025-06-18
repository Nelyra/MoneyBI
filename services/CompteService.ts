import { localSql, etlSql } from "../sql";
import { Compte, CompteETL, CompteWithMontant } from "../model/compte";

export async function getComptes(): Promise<CompteWithMontant[]> {
    const result = (await localSql.query("SELECT * FROM compte")
        .catch((err) => {
            console.error("Error fetching comptes:", err);
            throw err;
        }))[0] as CompteWithMontant[];

    return result;
}

export async function getComptesETL(): Promise<CompteETL[]> {
    const comptesETL: CompteETL[] = [];
    const comptes: CompteWithMontant[] = await getComptes();



    for (const compte of comptes) {
        if (compte.idCompte === null || compte.idCompte === undefined) {
            console.warn("Skipping compte with null values:", compte);
            continue;
        }

        comptesETL.push({
            idCompte: compte.idCompte,
            nomBanque: compte.nomBanque,
            dernierMontantCalcule: compte['dernierMontantCalculé'] !== undefined ? compte['dernierMontantCalculé'] : 0,
        });
    }

    return comptesETL;
}

export async function getCompteById(id: number): Promise<Compte | null> {
    const result = await localSql.query("SELECT * FROM compte WHERE idCompte = ?", [id])
        .catch((err) => {
            console.error("Error fetching compte by ID:", err);
            throw err;
        })[0] as Compte[];

    return result.length > 0 ? result[0] : null;
}

export async function insertCompte(compte: Compte): Promise<Compte> {
    const result: any = await localSql.query("INSERT INTO compte (idUtilisateur, descriptionCompte, nomBanque, dateHeureCreation, dateHeureMAJ) VALUES (?, ?, ?, ?, ?)", 
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

export async function insertETLCompte(compte: CompteETL): Promise<CompteETL> {
    const result: any = await etlSql.query("INSERT INTO compte (idCompte, nomBanque, dernierMontantCalcule) VALUES (?, ?, ?)",
        [compte.idCompte, compte.nomBanque, compte.dernierMontantCalcule])
        .catch((err) => {
            console.error("Error inserting ETL compte:", err);
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

export async function insertMultipleETLComptes(comptesETL: CompteETL[]): Promise<CompteETL[]> {
    const insertedComptesETL: CompteETL[] = [];
    
    for (const compteETL of comptesETL) {
        const insertedCompteETL = await insertETLCompte(compteETL);
        insertedComptesETL.push(insertedCompteETL);
    }
    return insertedComptesETL;
}