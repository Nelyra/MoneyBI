import sql from "../mysql";

export async function emptyTables() {
    await sql.query("SET FOREIGN_KEY_CHECKS = 0");
    await sql.query("TRUNCATE TABLE utilisateur");
    await sql.query("TRUNCATE TABLE categorie");
    await sql.query("TRUNCATE TABLE souscategorie");
    await sql.query("TRUNCATE TABLE compte");
    await sql.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("All tables have been emptied.");
}