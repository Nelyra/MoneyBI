import { Categorie } from "../model/categorie";
import { client } from "../mysql";

export async function get(id: number): Promise<Categorie> {
    return new Promise((resolve, reject) => {
        client.query(
            "SELECT * FROM categorie WHERE idCategorie = ?",
            [id],
            (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length === 0) {
                    reject(new Error("Categorie not found"));
                } else {
                    resolve(results[0] as Categorie);
                }
            }
        );
    });
}