export interface Tiers {
    idTiers?: number;
    nomTiers: string;
    idUtilisateur: number;
    dateHeureCreation: Date;
    dateHeureMAJ: Date;
}

export interface TiersETL {
    idTiers: number;
    nomTiers: string;
}