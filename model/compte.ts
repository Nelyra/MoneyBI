export interface Compte {
    idCompte?: number;
    nomBanque: string;
    descriptionCompte: string;
    idUtilisateur: number;
    dateHeureCreation: Date;
    dateHeureMAJ: Date;
}

export interface CompteETL {
    idCompte: number;
    nomBanque: string;
}