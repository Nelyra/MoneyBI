export interface SousCategorie {
    idSousCategorie?: number;
    idCategorie: number;
    nomSousCategorie: string;
    dateHeureCreation: Date;
    dateHeureMAJ: Date;
}

export interface SousCategorieETL {
    idSousCategorie: number;
    idCategorie: number;
    nomSousCategorie: string;
}