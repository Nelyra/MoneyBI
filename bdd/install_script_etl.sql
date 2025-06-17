CREATE TABLE `Mouvement` (
  `idMouvement` integer PRIMARY KEY,
  `dateMouvement` date,
  `montant` integer,
  `idCompte` integer,
  `idTiers` integer,
  `idCategorie` integer,
  `idSousCategorie` integer
);

CREATE TABLE `Tiers` (
  `idTiers` integer PRIMARY KEY,
  `nomTiers` varchar(50)
);

CREATE TABLE `Compte` (
  `idCompte` integer PRIMARY KEY,
  `nomBanque` varchar(50)
);

CREATE TABLE `SousCategorie` (
  `idSousCategorie` integer PRIMARY KEY,
  `nomSousCategorie` varchar(50),
  `idCategorie` integer
);

CREATE TABLE `Categorie` (
  `idCategorie` integer PRIMARY KEY,
  `nomCategorie` varchar(50)
);

ALTER TABLE `Mouvement` ADD FOREIGN KEY (`idCompte`) REFERENCES `Compte` (`idCompte`);

ALTER TABLE `Mouvement` ADD FOREIGN KEY (`idTiers`) REFERENCES `Tiers` (`idTiers`);

ALTER TABLE `Mouvement` ADD FOREIGN KEY (`idCategorie`) REFERENCES `Categorie` (`idCategorie`);

ALTER TABLE `Mouvement` ADD FOREIGN KEY (`idSousCategorie`) REFERENCES `SousCategorie` (`idSousCategorie`);

ALTER TABLE `SousCategorie` ADD FOREIGN KEY (`idCategorie`) REFERENCES `Categorie` (`idCategorie`);
