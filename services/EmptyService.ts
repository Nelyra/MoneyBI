import { localSql, etlSql } from "../sql";

export async function emptyTables() {
    await localSql.query("SET FOREIGN_KEY_CHECKS = 0");
    await localSql.query("TRUNCATE TABLE utilisateur");
    await localSql.query("TRUNCATE TABLE categorie");
    await localSql.query("TRUNCATE TABLE souscategorie");
    await localSql.query("TRUNCATE TABLE compte");
    await localSql.query("TRUNCATE TABLE tiers");
    await localSql.query("TRUNCATE TABLE mouvement");
    await localSql.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("All tables have been emptied.");
}

export async function emptyETLTables() {
    await etlSql.query("SET FOREIGN_KEY_CHECKS = 0");
    await etlSql.query("TRUNCATE TABLE categorie");
    await etlSql.query("TRUNCATE TABLE souscategorie");
    await etlSql.query("TRUNCATE TABLE compte");
    await etlSql.query("TRUNCATE TABLE tiers");
    await etlSql.query("TRUNCATE TABLE mouvement");
    await etlSql.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("All tables have been emptied.");
}