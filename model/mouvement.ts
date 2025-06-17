export interface Mouvement {
    idMouvement?: number;
    idCompte: number;
    idTiers: number;
    idSousCategorie: number;
    idCategorie: number;
    idVirement: number | null;
    montant: number;
    typeMouvement: string; // 'D' pour débit, 'C' pour crédit
    dateMouvement: Date;
    dateHeureCreation: Date;
    dateHeureMAJ: Date;
}

export interface MouvementETL {
    idMouvement: number;
    idCompte: number;
    idTiers: number;
    idSousCategorie: number;
    idCategorie: number;
    montant: number;
    dateMouvement: Date;
}
