const mysql = require("mysql");
const express = require('express');
const router = express.Router();
const moment = require('moment-timezone'); 


const db = require("../bdd/connexion_MSD");



db.connect(function(err) {   
    if (err) {
        console.error('Erreur lors de la connexion à la base de données MySQL:', err);
        return;
    } else{
        console.log("Connecté à la base de données MySQL!"); 
    }
    
});



router.get('/', (req, res) => {
    db.query('SELECT * FROM `devis`', (err, rows) => {
        if(err) {
            console.error('Erreur lors de la récupération des données:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
            return;
        }
        res.status(200).json(rows);
    });
});


router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM `devis` WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.error('Erreur lors de la récupération des données:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
            return;
        }
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'Aucune entrée trouvée avec cet ID' });
        }
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM devis WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if(err) {
            console.error('Erreur lors de la suppression des données:', err);
            res.status(500).json({ error: 'Erreur lors de la suppression des données' });
            return;
        }
        res.status(200).json({ message: 'Données supprimées avec succès' });
    });
});


function formatDate(date) {
    const hours = date.hours();
    const minutes = date.minutes();
    return date.format(minutes === 0 ? "YYYY-MM-DD HH" : "YYYY-MM-DD HH:mm");
}

router.post('/', (req, res) => {
    const devis = req.body;
    const now = formatDate( moment().tz("Europe/Paris"));
    const sqlInsert = 'INSERT INTO devis (nom, prenom, societe, surface, estimation, peinture, email, description, typeclient, num, date_demande) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sqlInsert, [devis.nom, devis.prenom, devis.societe, devis.surface, devis.estimation, devis.peinture, devis.email, devis.description, devis.typeclient, devis.num, now], (err, result) => {
        if(err) {
            console.error('Erreur lors de l\'insertion des données:', err);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données' });
            return;
        }
        res.status(200).json({ message: 'Données insérées avec succès', id: result.insertId });
        console.log(sqlInsert, [devis.nom, devis.prenom, devis.societe, devis.surface, devis.estimation, devis.peinture, devis.email, devis.description, devis.num, devis.typeclient, now])
    });
});





module.exports = router;


/*
DROP TABLE IF EXISTS `devis`;
CREATE TABLE IF NOT EXISTS `devis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `societe` varchar(255) NOT NULL,
  `surface` int NOT NULL,
  `estimation` int NOT NULL,
  `peinture` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date_demande` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;*/