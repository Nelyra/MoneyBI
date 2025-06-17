SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de données : `money`
--

DELIMITER $$
--
-- Fonctions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `soldeHistorique` (`pIdCompte` INT, `pDate` DATE) RETURNS DECIMAL(7,2) DETERMINISTIC BEGIN
    DECLARE vSolde decimal(7,2) DEFAULT 0;
    SELECT sum(Mouvement.montant) INTO vSolde FROM Mouvement where Mouvement.idCompte=pIdCompte AND Mouvement.dateMouvement <= pDate;
    IF vSolde IS NULL THEN
        SET vSolde = 0;
    end if;
    return vSolde;
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `idCategorie` int(11) NOT NULL,
  `nomCategorie` varchar(50) NOT NULL,
  `dateHeureCreation` timestamp NULL DEFAULT current_timestamp(),
  `dateHeureMAJ` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déclencheurs `categorie`
--
DELIMITER $$
CREATE TRIGGER `TRG_BEFORE_UPDATE_CATEGORIE` BEFORE UPDATE ON `categorie` FOR EACH ROW begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

CREATE TABLE `compte` (
  `idCompte` int(11) NOT NULL,
  `descriptionCompte` varchar(50) NOT NULL,
  `nomBanque` varchar(50) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `dateHeureCreation` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateHeureMAJ` timestamp NULL DEFAULT current_timestamp(),
  `montantInitial` decimal(7,2) NOT NULL DEFAULT 0.00,
  `dernierMontantCalculé` decimal(7,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déclencheurs `compte`
--
DELIMITER $$
CREATE TRIGGER `TRG_BEFORE_UPDATE_COMPTE` BEFORE UPDATE ON `compte` FOR EACH ROW begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `mouvement`
--

CREATE TABLE `mouvement` (
  `idMouvement` int(11) NOT NULL,
  `dateMouvement` date NOT NULL DEFAULT curdate(),
  `idCompte` int(11) NOT NULL,
  `idTiers` int(11) DEFAULT 1,
  `idCategorie` int(11) DEFAULT 1,
  `idSousCategorie` int(11) DEFAULT NULL,
  `idVirement` int(11) DEFAULT NULL,
  `montant` decimal(6,2) DEFAULT NULL,
  `typeMouvement` char(1) DEFAULT 'D',
  `dateHeureCreation` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateHeureMAJ` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déclencheurs `mouvement`
--
DELIMITER $$
CREATE TRIGGER `TRG_AFTER_INSERT_MOUVEMENT` AFTER INSERT ON `mouvement` FOR EACH ROW begin
    /* Il faut mettre à jour le solde du commpte */
UPDATE Compte set dernierMontantCalculé = dernierMontantCalculé + NEW.montant where Compte.idCompte = NEW.idCompte;
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TRG_AFTER_UPDATE_MOUVEMENT` AFTER UPDATE ON `mouvement` FOR EACH ROW begin
    /* Il faut mettre à jour le solde du commpte en soustrayant l'ancien montant du mouvement et en ajoutant le nouveau */
UPDATE Compte set dernierMontantCalculé = dernierMontantCalculé + NEW.montant - OLD.montant where Compte.idCompte = NEW.idCompte;
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TRG_BEFORE_INSERT_MOUVEMENT` BEFORE INSERT ON `mouvement` FOR EACH ROW begin
    DEClARE v_Categorie INT DEFAULT 0;
    
    /* Il faut vérifier que la sous-catégorie appartient bien à la catégorie */
    IF NEW.idSousCategorie IS NOT NULL THEN
        SELECT idCategorie INTO v_Categorie FROM SousCategorie WHERE idSousCategorie = NEW.idSousCategorie;
        IF v_Categorie <> NEW.idCategorie THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'La sous-catégorie n''appartient pas à la catégorie choisie';
        end if;
    end if;
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `souscategorie`
--

CREATE TABLE `souscategorie` (
  `idSousCategorie` int(11) NOT NULL,
  `nomSousCategorie` varchar(50) NOT NULL,
  `idCategorie` int(11) NOT NULL,
  `dateHeureCreation` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateHeureMAJ` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déclencheurs `souscategorie`
--
DELIMITER $$
CREATE TRIGGER `TRG_BEFORE_UPDATE_SOUS_CATEGORIE` BEFORE UPDATE ON `souscategorie` FOR EACH ROW begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `tiers`
--

CREATE TABLE `tiers` (
  `idTiers` int(11) NOT NULL,
  `nomTiers` varchar(50) NOT NULL,
  `dateHeureCreation` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateHeureMAJ` timestamp NOT NULL DEFAULT current_timestamp(),
  `idUtilisateur` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déclencheurs `tiers`
--
DELIMITER $$
CREATE TRIGGER `TRG_BEFORE_UPDATE_TIERS` BEFORE UPDATE ON `tiers` FOR EACH ROW begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `idUtilisateur` int(11) NOT NULL,
  `nomUtilisateur` varchar(50) NOT NULL,
  `prenomUtilisateur` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `mdp` varchar(50) DEFAULT NULL,
  `hashcode` varchar(128) DEFAULT NULL,
  `dateHeureCreation` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateHeureMAJ` timestamp NULL DEFAULT current_timestamp(),
  `ville` varchar(50) DEFAULT NULL,
  `codePostal` char(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déclencheurs `utilisateur`
--
DELIMITER $$
CREATE TRIGGER `TRG_BEFORE_UPDATE_UTILISATEUR` BEFORE UPDATE ON `utilisateur` FOR EACH ROW begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `virement`
--

CREATE TABLE `virement` (
  `idVirement` int(11) NOT NULL,
  `idCompteDebit` int(11) NOT NULL,
  `idCompteCredit` int(11) NOT NULL,
  `montant` decimal(6,2) NOT NULL DEFAULT 0.00,
  `dateVirement` date NOT NULL DEFAULT curdate(),
  `dateHeureCreation` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateHeureMAJ` timestamp NOT NULL DEFAULT current_timestamp(),
  `commentaire` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déclencheurs `virement`
--
DELIMITER $$
CREATE TRIGGER `TRG_AFTER_DELETE_VIREMENT` AFTER DELETE ON `virement` FOR EACH ROW begin
    DELETE FROM Mouvement WHERE idVirement = OLD.idVirement;
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TRG_AFTER_INSERT` AFTER INSERT ON `virement` FOR EACH ROW begin
    /* Il faut insérer deux mouvements correspondant à ce virement inter-comptes */
/* un mouvement au débit sur le compte débité */
/* Un mouvement au crédit sur le cmpte crédité */
INSERT INTO Mouvement(idCompte,montant,typeMouvement,idVirement,dateMouvement) VALUES (NEW.idCompteDebit,(NEW.montant * -1),'D',NEW.idVirement,NEW.dateVirement);
INSERT INTO Mouvement(idCompte,montant,typeMouvement,idVirement,dateMouvement) VALUES ( NEW.idCompteCredit,NEW.montant, 'C',NEW.idVirement,NEW.dateVirement);
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TRG_BEFORE_UPDATE_VIREMENT` BEFORE UPDATE ON `virement` FOR EACH ROW begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `v_categorie`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `v_categorie` (
`nomCategorie` varchar(50)
,`nomSousCategorie` varchar(50)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `v_mouvement`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `v_mouvement` (
`idMouvement` int(11)
,`dateMouvement` date
,`descriptionCompte` varchar(50)
,`nomBanque` varchar(50)
,`nomTiers` varchar(50)
,`nomCategorie` varchar(50)
,`nomSousCategorie` varchar(50)
,`montant` decimal(6,2)
);

-- --------------------------------------------------------

--
-- Structure de la vue `v_categorie`
--
DROP TABLE IF EXISTS `v_categorie`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_categorie`  AS SELECT `c`.`nomCategorie` AS `nomCategorie`, `sc`.`nomSousCategorie` AS `nomSousCategorie` FROM (`categorie` `c` join `souscategorie` `sc`) WHERE `sc`.`idCategorie` = `c`.`idCategorie` ORDER BY `c`.`nomCategorie` ASC, `sc`.`nomSousCategorie` ASC ;

-- --------------------------------------------------------

--
-- Structure de la vue `v_mouvement`
--
DROP TABLE IF EXISTS `v_mouvement`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_mouvement`  AS SELECT `m`.`idMouvement` AS `idMouvement`, `m`.`dateMouvement` AS `dateMouvement`, `c`.`descriptionCompte` AS `descriptionCompte`, `c`.`nomBanque` AS `nomBanque`, `t`.`nomTiers` AS `nomTiers`, `ctg`.`nomCategorie` AS `nomCategorie`, `sctg`.`nomSousCategorie` AS `nomSousCategorie`, `m`.`montant` AS `montant` FROM ((((`mouvement` `m` join `compte` `c` on(`m`.`idCompte` = `c`.`idCompte`)) join `tiers` `t` on(`m`.`idTiers` = `t`.`idTiers`)) join `categorie` `ctg` on(`m`.`idCategorie` = `ctg`.`idCategorie`)) left join `souscategorie` `sctg` on(`m`.`idSousCategorie` = `sctg`.`idSousCategorie`)) ORDER BY `m`.`dateMouvement` ASC ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`idCategorie`);

--
-- Index pour la table `compte`
--
ALTER TABLE `compte`
  ADD PRIMARY KEY (`idCompte`),
  ADD KEY `Compte_Utilisateur_idUtilisateur_fk` (`idUtilisateur`);

--
-- Index pour la table `mouvement`
--
ALTER TABLE `mouvement`
  ADD PRIMARY KEY (`idMouvement`),
  ADD KEY `Mouvement_Categorie_idCategorie_fk` (`idCategorie`),
  ADD KEY `Mouvement_Compte_idCompte_fk` (`idCompte`),
  ADD KEY `Mouvement_SousCategorie_idSousCategorie_fk` (`idSousCategorie`),
  ADD KEY `Mouvement_Tiers_idTiers_fk` (`idTiers`),
  ADD KEY `Mouvement_Virement_idVirement_fk` (`idVirement`);

--
-- Index pour la table `souscategorie`
--
ALTER TABLE `souscategorie`
  ADD PRIMARY KEY (`idSousCategorie`),
  ADD KEY `SousCategorie_Categorie_idCategorie_fk` (`idCategorie`);

--
-- Index pour la table `tiers`
--
ALTER TABLE `tiers`
  ADD PRIMARY KEY (`idTiers`),
  ADD KEY `Tiers_Utilisateur_idUtilisateur_fk` (`idUtilisateur`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`idUtilisateur`);

--
-- Index pour la table `virement`
--
ALTER TABLE `virement`
  ADD PRIMARY KEY (`idVirement`),
  ADD KEY `Virement_Compte_idCompte_fk` (`idCompteDebit`),
  ADD KEY `Virement_Compte_idCompte_fk_2` (`idCompteCredit`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `idCategorie` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `compte`
--
ALTER TABLE `compte`
  MODIFY `idCompte` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `mouvement`
--
ALTER TABLE `mouvement`
  MODIFY `idMouvement` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `souscategorie`
--
ALTER TABLE `souscategorie`
  MODIFY `idSousCategorie` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tiers`
--
ALTER TABLE `tiers`
  MODIFY `idTiers` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `virement`
--
ALTER TABLE `virement`
  MODIFY `idVirement` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `compte`
--
ALTER TABLE `compte`
  ADD CONSTRAINT `Compte_Utilisateur_idUtilisateur_fk` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`idUtilisateur`) ON DELETE CASCADE;

--
-- Contraintes pour la table `mouvement`
--
ALTER TABLE `mouvement`
  ADD CONSTRAINT `Mouvement_Categorie_idCategorie_fk` FOREIGN KEY (`idCategorie`) REFERENCES `categorie` (`idCategorie`),
  ADD CONSTRAINT `Mouvement_Compte_idCompte_fk` FOREIGN KEY (`idCompte`) REFERENCES `compte` (`idCompte`) ON DELETE CASCADE,
  ADD CONSTRAINT `Mouvement_SousCategorie_idSousCategorie_fk` FOREIGN KEY (`idSousCategorie`) REFERENCES `souscategorie` (`idSousCategorie`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Mouvement_Tiers_idTiers_fk` FOREIGN KEY (`idTiers`) REFERENCES `tiers` (`idTiers`),
  ADD CONSTRAINT `Mouvement_Virement_idVirement_fk` FOREIGN KEY (`idVirement`) REFERENCES `virement` (`idVirement`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `souscategorie`
--
ALTER TABLE `souscategorie`
  ADD CONSTRAINT `SousCategorie_Categorie_idCategorie_fk` FOREIGN KEY (`idCategorie`) REFERENCES `categorie` (`idCategorie`) ON DELETE CASCADE;

--
-- Contraintes pour la table `tiers`
--
ALTER TABLE `tiers`
  ADD CONSTRAINT `Tiers_Utilisateur_idUtilisateur_fk` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`idUtilisateur`);

--
-- Contraintes pour la table `virement`
--
ALTER TABLE `virement`
  ADD CONSTRAINT `Virement_Compte_idCompte_fk` FOREIGN KEY (`idCompteDebit`) REFERENCES `compte` (`idCompte`),
  ADD CONSTRAINT `Virement_Compte_idCompte_fk_2` FOREIGN KEY (`idCompteCredit`) REFERENCES `compte` (`idCompte`);
COMMIT;
