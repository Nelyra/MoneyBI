export interface Utilisateur {
    idUtilisateur?: number;
    nomUtilisateur: string;
    prenomUtilisateur: string;
    login: string;
    mdp: string;
    ville: string;
    codePostal: string;
    hashCode?: string;
    dateHeureCreation?: Date;
    dateHeureMAJ?: Date;
}