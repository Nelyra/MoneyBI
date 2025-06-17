export interface Categorie {
  idCategorie?: number;
  nomCategorie: string;
  dateHeureCreation: Date;
  dateHeureMAJ: Date;
}

export interface CategorieETL {
  idCategorie: number;
  nomCategorie: string;
}