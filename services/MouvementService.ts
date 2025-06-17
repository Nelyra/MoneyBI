import sql from "../mysql";

import { Mouvement } from "../model/mouvement"; 

export async function getMouvements(): Promise<Mouvement[]> {
    const result = await sql.query("SELECT * FROM mouvement")
        .catch((err) => {
            console.error("Error fetching mouvements:", err);
            throw err;
        })[0] as Mouvement[];

    return result;
}

export async function getMouvementById(id: number): Promise<Mouvement | null> {
    const result = await sql.query("SELECT * FROM mouvement WHERE idMouvement = ?", [id])
        .catch((err) => {
            console.error("Error fetching mouvement by ID:", err);
            throw err;
        })[0] as Mouvement[];

    return result.length > 0 ? result[0] : null;
}

export async function insertMouvement(mouvement: Mouvement): Promise<Mouvement> {
    const result: any = await sql.query("INSERT INTO mouvement (idCompte, idTiers, idSousCategorie, idCategorie, montant, dateHeureCreation, dateHeureMAJ) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [mouvement.idCompte, mouvement.idTiers, mouvement.idSousCategorie, mouvement.idCategorie, mouvement.montant, mouvement.dateHeureCreation, mouvement.dateHeureMAJ])
        .catch((err) => {
            console.error("Error inserting mouvement:", err);
            throw err;
        });
    return {
        ...mouvement,
        idMouvement: result[0].insertId,
    };
}

export async function insertMultipleMouvements(mouvements: Mouvement[]): Promise<Mouvement[]> {
    const insertedMouvements: Mouvement[] = [];
    for (const mouvement of mouvements) {
        const insertedMouvement = await insertMouvement(mouvement);
        insertedMouvements.push(insertedMouvement);
    }
    return insertedMouvements;
}