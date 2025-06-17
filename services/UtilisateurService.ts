import sql from "../mysql";

import { Utilisateur } from "../model/utilisateur";
import { get } from "http";

export async function getUtilisateurs(): Promise<Utilisateur[]> {
    const result = await sql.query("SELECT * FROM utilisateur")
        .catch((err) => {
            console.error("Error fetching utilisateurs:", err);
            throw err;
        })[0] as Utilisateur[];

    return result;
}

export async function getUtilisateurById(id: number): Promise<Utilisateur | null> {
    const result = (await sql.query("SELECT * FROM utilisateur WHERE idUtilisateur = ?", [id])
        .catch((err) => {
            console.error("Error fetching utilisateur by ID:", err);
            throw err;
        }))[0] as Utilisateur[];

    return result.length > 0 ? result[0] : null;
}

export async function insertUtilisateur(utilisateur: Utilisateur): Promise<Utilisateur> {
    const result: any = await sql.query("INSERT INTO utilisateur (idUtilisateur, nomUtilisateur, prenomUtilisateur, login, mdp, ville, codePostal, dateHeureCreation, dateHeureMAJ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [utilisateur.idUtilisateur, utilisateur.nomUtilisateur, utilisateur.prenomUtilisateur, utilisateur.login, utilisateur.mdp, utilisateur.ville, utilisateur.codePostal, utilisateur.dateHeureCreation, utilisateur.dateHeureMAJ])
        .catch((err) => {
            console.error("Error inserting utilisateur:", err);
            throw err;
        });
    return {
        ...utilisateur,
        idUtilisateur: result[0].insertId,
    }
}

export async function makeUtilisateur(utilisateur: Utilisateur): Promise<Utilisateur> {
    const isUser1 = await getUtilisateurById(1);

    if (isUser1) {
        return isUser1; // If user with ID 1 already exists, return it
    }

    return insertUtilisateur(utilisateur);
}

