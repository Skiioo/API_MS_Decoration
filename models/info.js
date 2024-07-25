
class Info {
    
    constructor(nom, prenom, email, num, statut_juridique, surface, peinture, description) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.num = num;
        this.statut_juridique = statut_juridique;
        this.surface = surface;
        this.peinture = peinture;
        this.description = description;
    }

     connexion = require('../bdd/connexion_MSD');

     create(db) {
        return new Promise((resolve, reject) => {
            const sqlInsert = "INSERT INTO info (nom, prenom, email, num, statut_juridique, surface, peinture, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            db.query(sqlInsert, [this.nom, this.prenom, this.email, this.num, this.statut_juridique, this.surface, this.peinture, this.description], (err, result) => {
                if(err) {
                    console.error("Erreur lors de l'insertion des données:", err);
                    reject({ error: "Erreur lors de l'insertion des données" });
                } else {
                    resolve({ message: 'Données insérées avec succès', id: result.insertId });
                }
            });
        });
    }

    read(db) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `info`', (err, rows) => {
                if(err) {
                    console.error('Erreur lors de la récupération des données:', err);
                    reject({ error: 'Erreur lors de la récupération des données' });
                } else {
                    resolve(rows);
                }
            });
        });
    }

    readOne(db, id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `info` WHERE id = ?', [id], (err, rows) => {
                if(err) {
                    console.error('Erreur lors de la récupération des données:', err);
                    reject({ error: 'Erreur lors de la récupération des données' });
                } else if (rows.length > 0) {
                    resolve(rows[0]);
                } else {
                    reject({ error: 'Aucune entrée trouvée avec cet ID' });
                }
            });
        });
    }

    delete(db, id) {
        return new Promise((resolve, reject) => {
            const sqlDelete = "DELETE FROM info WHERE id = ?";
            db.query(sqlDelete, id, (err, result) => {
                if(err) {
                    console.error('Erreur lors de la suppression des données:', err);
                    reject({ error: 'Erreur lors de la suppression des données' });
                } else {
                    resolve({ message: 'Données supprimées avec succès' });
                }
            });
        });
    }

   
}
module.exports = Info;



/*
DROP TABLE IF EXISTS `info`;
CREATE TABLE IF NOT EXISTS `info` (
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `num` int NOT NULL,
  `statut_juridique` varchar(255) NOT NULL,
  `surface` int NOT NULL,
  `peinture` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;*/