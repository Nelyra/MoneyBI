export interface Compte {
    idCompte?: number;
    nomBanque: string;
    descriptionCompte: string;
    idUtilisateur: number;
    dateHeureCreation: Date;
    dateHeureMAJ: Date;
}

export interface CompteWithMontant extends Compte {
    dernierMontantCalculé: number;
}

export interface CompteETL {
    idCompte: number;
    nomBanque: string;
    dernierMontantCalcule: number;
}