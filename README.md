> Population of test data onto a local database, and Implementation of an ETL to transfer said data to a distant database.

## Installation

First, clone the project 

```bash
git clone https://github.com/Nelyra/MoneyBI.git
```

Then install the npm dependencies using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
cd ./MoneyBI
npm i -y
npm install
```

This will download every node package necessary for the API to be up and ready.

### Setting up the environnement secrets

On the root of the project, create a `.env` file. You will need to set a few variables in this file. You can use the file `.example.env` as an example to understand what it looks like. Here's a rundown of every variable:

| Variable | Usage |
| --- | --- |
| BDD_HOST | The base URI of your database |
| BDD_USER | The user logging used by the API |
| BDD_PASSWORD | The corresponding password to DB_USER |
| BDD_NAME | Which Database will be used to store data |
| --- | --- |
| BDD_ETL_HOST | Same input for the PowerBI database |
| BDD_ETL_USER | Same input for the PowerBI database |
| BDD_ETL_PASSWORD | Same input for the PowerBI database |
| BDD_ETL_NAME | Same input for the PowerBI database |

**Make sure that the database variables indicated in this file corresponds to the ones who will be used when doing SQL requests.**

### Setting up the database.

Our project does not automatically create a database for you, you will need to run the setup script yourself.
The setup script are the files named `/bdd/install_script_local.sql` for the local database and `/bdd/install_script_etl.sql` for the distant database. Copy the entierity and run them.

> If a previous project using the same Database structure was existing on this Database, you can run the script again, and it clear every table for you.

Before running the API, make sure that your **Database engine is running properly**.

## Generating test data into the local database

The generation of test data is done through the [faker](https://fakerjs.dev/) package.
You can populate the local database using this command:

```bash
npm run generate
```

## Inserting data into the distant database.

Once you have data onto your local database, you can transfer data (and transform it) to the distant database, ready to be analysed. (For our case, we used PowerBI)
You can transfer data using this command:

```bash
npm run insert
```

## Directory structure

```
root
├─ bdd/
├─ model/
├─ services/
├─ .env / .example.env
├─ faker.ts
├─ generate.ts
├─ insert.ts
└─ sql.js
```

### 📁 /bdd

The **BDD** folder stores the script used to create the database structures into a blank one (or one who used the same exact structure). You have to use them yourself.

### 📁 Model

Each file in the **model** folder is a used for TypeScript models. Helpful to understand how what is passed through the functions!

### 📁 Services

The **services** folder handles the data processing and SQL requests to both **INSERT** onto the local & distant databases, as well as **SELECT** from the local one.

### 🔒 .env / .example.env

environment variables' file. See the chapter *Setting up the environnement secrets* to know how to use them.

### 📄 faker.ts

Every function that is using the faker package is placed in this file. Change it if you want specific properties onto your test data.

### 📄 generate.ts

The function that is called when using `npm run generate`.

### 📄 insert.ts

The function that is called when using `npm run insert`.

### 📄 sql.ts

Enables the connection to both databases. It is the one who will be using the `.env` file.

## Contributors

| Student | Github |
| --- | --- |
| Leevan DAVID | [namuuu](https://github.com/namuuu) |
| Augustin MORICEAU | [Nelyra](https://github.com/Nelyra) |
| Léonore LEGRAND | No Github |
