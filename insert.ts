
import { emptyETLTables } from "./services/EmptyService";

import { getCategories, getCategoriesETL, insertMultipleETLCategories } from "./services/CategorieService";
import { getSousCategoriesETL, insertMultipleETLSousCategories } from "./services/SousCategorieService";
import { getComptesETL, insertMultipleETLComptes } from "./services/CompteService";
import { getTiersETL, insertMultipleETLTiers } from "./services/TiersService";
import { getMouvementsETL, insertMultipleETLMouvements } from "./services/MouvementService";
import { exit } from "process";
import dotenv from "dotenv";

dotenv.config();

async function insertETL() {
    await emptyETLTables();

    // console.log(getCategoriesETL());

    await insertMultipleETLCategories(await getCategoriesETL());
    await insertMultipleETLSousCategories(await getSousCategoriesETL());
    await insertMultipleETLComptes(await getComptesETL());
    await insertMultipleETLTiers(await getTiersETL());
    await insertMultipleETLMouvements(await getMouvementsETL());
    console.log("ETL data inserted successfully.");

    exit(0);
}

insertETL();