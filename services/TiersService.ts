import { localSql } from "../sql"; 

import { Tiers, TiersETL } from "../model/tiers";

export async function getTiers(): Promise<Tiers[]> {
    const result = await localSql.query("SELECT * FROM tiers")
        .catch((err) => {
            console.error("Error fetching tiers:", err);
            throw err;
        })[0] as Tiers[];

    return result;
}

export function getTiersETL(): TiersETL[] {
    const tiersETL: TiersETL[] = [];

    getTiers().then((tiers) => {
        for (const tier of tiers) {
            if (tier.idTiers === null || tier.idTiers === undefined) {
                console.warn("Skipping tier with null values:", tier);
                continue;
            }

            tiersETL.push({
                idTiers: tier.idTiers,
                nomTiers: tier.nomTiers,
            });
        }
    });

    return tiersETL;
}

export async function getTiersById(id: number): Promise<Tiers | null> {
    const result = await localSql.query("SELECT * FROM tiers WHERE idTiers = ?", [id])
        .catch((err) => {
            console.error("Error fetching tiers by ID:", err);
            throw err;
        })[0] as Tiers[];

    return result.length > 0 ? result[0] : null;
}

export async function insertTiers(tiers: Tiers): Promise<Tiers> {
    const result: any = await localSql.query("INSERT INTO tiers (nomTiers, dateHeureCreation, dateHeureMAJ) VALUES (?, ?, ?)", 
        [tiers.nomTiers, tiers.dateHeureCreation, tiers.dateHeureMAJ])
        .catch((err) => {
            console.error("Error inserting tiers:", err);
            throw err;
        });
    return {
        ...tiers,
        idTiers: result[0].insertId,
    };
}

export async function insertMultipleTiers(tiersList: Tiers[]): Promise<Tiers[]> {
    const insertedTiers: Tiers[] = [];
    for (const tiers of tiersList) {
        const insertedTiersItem = await insertTiers(tiers);
        insertedTiers.push(insertedTiersItem);
    }
    return insertedTiers;
}