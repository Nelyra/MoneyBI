import { localSql, etlSql } from "../sql";

import { Mouvement, MouvementETL } from "../model/mouvement"; 

export async function getMouvements(): Promise<Mouvement[]> {
    const result = (await localSql.query("SELECT * FROM mouvement")
        .catch((err) => {
            console.error("Error fetching mouvements:", err);
            throw err;
        }))[0] as Mouvement[];

    return result;
}

export async function getMouvementsETL(): Promise<MouvementETL[]> {
    const mouvementsETL: MouvementETL[] = [];
    const mouvements = await getMouvements();

    for (const mouvement of mouvements) {
        if (mouvement.idMouvement === null || mouvement.idMouvement === undefined) {
            console.warn("Skipping mouvement with null values:", mouvement);
            continue;
        }

        mouvementsETL.push({
            idMouvement: mouvement.idMouvement,
            idCompte: mouvement.idCompte,
            idTiers: mouvement.idTiers,
            idSousCategorie: mouvement.idSousCategorie,
            idCategorie: mouvement.idCategorie,
            montant: mouvement.montant * (mouvement.typeMouvement === "D" ? -1 : 1), // Assuming typeMouvement is 'D' for debit and 'C' for credit
            dateMouvement: mouvement.dateMouvement
        });
    }

    return mouvementsETL;
}

export async function getMouvementById(id: number): Promise<Mouvement | null> {
    const result = await localSql.query("SELECT * FROM mouvement WHERE idMouvement = ?", [id])
        .catch((err) => {
            console.error("Error fetching mouvement by ID:", err);
            throw err;
        })[0] as Mouvement[];

    return result.length > 0 ? result[0] : null;
}

export async function insertMouvement(mouvement: Mouvement): Promise<Mouvement> {
    const result: any = await localSql.query("INSERT INTO mouvement (idCompte, idTiers, idSousCategorie, idCategorie, montant, dateHeureCreation, dateHeureMAJ, typeMouvement) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
        [mouvement.idCompte, mouvement.idTiers, mouvement.idSousCategorie, mouvement.idCategorie, mouvement.montant, mouvement.dateHeureCreation, mouvement.dateHeureMAJ, mouvement.typeMouvement])
        .catch((err) => {
            console.error("Error inserting mouvement:", err);
            throw err;
        });
    return {
        ...mouvement,
        idMouvement: result[0].insertId,
    };
}

export async function insertETLMouvement(mouvement: MouvementETL): Promise<MouvementETL> {
    const result: any = await etlSql.query("INSERT INTO mouvement (idMouvement, idCompte, idTiers, idSousCategorie, idCategorie, montant, dateMouvement) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [mouvement.idMouvement, mouvement.idCompte, mouvement.idTiers, mouvement.idSousCategorie, mouvement.idCategorie, mouvement.montant, mouvement.dateMouvement])
        .catch((err) => {
            console.error("Error inserting ETL mouvement:", err);
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

export async function insertMultipleETLMouvements(mouvementsETL: MouvementETL[]): Promise<MouvementETL[]> {
    const insertedMouvementsETL: MouvementETL[] = [];
    for (const mouvementETL of mouvementsETL) {
        const insertedMouvementETL = await insertETLMouvement(mouvementETL);
        insertedMouvementsETL.push(insertedMouvementETL);
    }
    return insertedMouvementsETL;
}